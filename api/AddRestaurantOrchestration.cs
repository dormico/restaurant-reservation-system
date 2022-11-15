using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Restaurant
{
  public static class AddRestaurantOrchestration
  {
    [FunctionName("AddRestaurantOrchestration")]
    public static async Task<string> RunOrchestrator(
        [OrchestrationTrigger] IDurableOrchestrationContext context,
        ILogger log)
    {
      log.LogInformation("AddRestaurantOrchestration function processed a request.");

      RestaurantItem adat = context.GetInput<RestaurantItem>();

      var outputs = new List<string>();

      var RId = await context.CallActivityAsync<string>("AddRestaurantActivity", adat);
      var added = await context.CallHttpAsync(HttpMethod.Post, new System.Uri("https://orders-func-app.azurewebsites.net/api/addorderrestaurant?rid="+RId));
      log.LogInformation($"AddRestaurantOrchestration ended.");

      return RId;
    }

    [FunctionName("AddRestaurantActivity")]
    public static async Task<string> RunActivity(
        [ActivityTrigger] RestaurantItem adat,
        [CosmosDB(
        databaseName: "Restaurants",
        collectionName: "RestaurantItems",
        ConnectionStringSetting = "CosmosDbConnectionString")]IAsyncCollector<dynamic> documentsOut,
        ILogger log)
    {
      log.LogInformation("AddRestaurant activity function processed a request.");

      // name can not be data (throws error)
      RestaurantItem newRestaurant = adat;

      // create a random ID
      var RId = System.Guid.NewGuid().ToString();
      newRestaurant.id = RId;
      newRestaurant.partitionKey = RId;

      // Add a JSON document to the output container.
      var dataWithId = Newtonsoft.Json.JsonConvert.SerializeObject(newRestaurant);
      Console.WriteLine("Sending JSON data to Cosmos: " + dataWithId);
      await documentsOut.AddAsync(newRestaurant);

      //var responseMessage = JsonConvert.SerializeObject(RId);

      return RId;
    }

    [FunctionName("AddRestaurantOrchestration_HttpStart")]
    public static async Task<HttpResponseMessage> HttpStart(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestMessage req,
        [DurableClient] IDurableOrchestrationClient starter,
        ILogger log)
    {      
      RestaurantItem adat = await req.Content.ReadAsAsync<RestaurantItem>();
      
      // Function input comes from the request content.
      string instanceId = await starter.StartNewAsync("AddRestaurantOrchestration", adat);

      log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

      return starter.CreateCheckStatusResponse(req, instanceId);
    }
  }
}