using Newtonsoft.Json;

namespace Restaurant
{
#nullable enable
  public class RestaurantItem
  {
    public string? partitionKey { get; set; }
    public string? id { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }

    [JsonProperty("takeaway")]
    public bool IsTakeawayAllowed { get; set; }
    public int Pricing { get; set; }
    public string? CardNum { get; set; }
    public int Opening { get; set; }
    public int Closing { get; set; }
    public MenuItem[]? Menu { get; set; }

    public string? Image { get; set; }
    public string? Website { get; set; }
    public string? Style { get; set; }
    public Review[]? Reviews { get; set; }
    public int? Rating { get; set; }

    public class MenuItem
    {
      [JsonProperty("dishId")]
      public string? id { get; set; }
      public string? Name { get; set; }
      public string? Description { get; set; }
      public int Price { get; set; }
      public string? Image { get; set; }
    }

    public class Review
    {
      public string? Date { get; set; }
      public int Rating { get; set; }
      public string? Text { get; set; }
      public string? Answer { get; set; }
    }
  }
}