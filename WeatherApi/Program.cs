using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddHttpClient<GeocodingService>();
builder.Services.AddHttpClient<WeatherService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

public class GeocodingService
{
    private readonly HttpClient _httpClient;

    public GeocodingService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<(double, double)> GetCoordinatesAsync(string address)
    {
        var response = await _httpClient.GetStringAsync($"https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address={address}&benchmark=Public_AR_Current&format=json");
        var data = JObject.Parse(response);
        var coordinates = data["result"]["addressMatches"][0]["coordinates"];
        double latitude = (double)coordinates["y"];
        double longitude = (double)coordinates["x"];
        return (latitude, longitude);
    }
}

public class WeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<JObject> GetWeatherForecastAsync(double latitude, double longitude)
    {
        var response = await _httpClient.GetStringAsync($"https://api.weather.gov/points/{latitude},{longitude}");
        var forecastUrl = JObject.Parse(response)["properties"]["forecast"];
        var forecastResponse = await _httpClient.GetStringAsync(forecastUrl.ToString());
        return JObject.Parse(forecastResponse);
    }
}
