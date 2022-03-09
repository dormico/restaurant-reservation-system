using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;

namespace Restaurant
{
  public static class RestaurantsList
  {
    static readonly HttpClient client = new HttpClient();

    [FunctionName("RestaurantsList")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      log.LogInformation("C# HTTP trigger function processed a request.");

      string restaurantName = req.Query["name"];

      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      dynamic data = JsonConvert.DeserializeObject(requestBody);
      restaurantName = restaurantName ?? data?.name;

      string responseJson = string.IsNullOrEmpty(restaurantName)
          ? string.Format("\"restaurants\":[{{ \"name\": \"FastFooder\", \"style\": \"fast food\" }}, {{ \"name\": \"Pizza Italiana\", \"style\": \"italian\" }}]")
          : string.Format("\"restaurants\":[{{ \"name\": \"{0}\", \"style\": \"unknown\" }}]", restaurantName);

      return new OkObjectResult(responseJson);
      // await client.SendAsync(new HttpResponseMessage(System.Net.HttpStatusCode.OK)
      // {
      //   Content = responseJson;
      // });
    }
  }
}