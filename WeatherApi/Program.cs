using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using WeatherApi;
using WeatherApi.Models;
using Newtonsoft.Json;

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
    private readonly ILogger<GeocodingService> _logger;

    public GeocodingService(HttpClient httpClient, ILogger<GeocodingService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<(double, double)> GetCoordinatesAsync(string address)
    {
        try
        {
            var response = await _httpClient.GetStringAsync($"https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address={address}&benchmark=Public_AR_Current&format=json");
            _logger.LogInformation("Geocoding response: {response}", response);
            var data = JObject.Parse(response);
            var addressMatches = data["result"]?["addressMatches"];
            
            if (addressMatches == null || !addressMatches.Any())
            {
                throw new Exception("No address matches found.");
            }

            var coordinates = addressMatches[0]?["coordinates"];
            if (coordinates == null)
            {
                throw new Exception("Coordinates not found.");
            }

            var latitudeToken = coordinates["y"];
            var longitudeToken = coordinates["x"];

            if (latitudeToken == null || longitudeToken == null)
            {
                throw new Exception("Latitude or Longitude not found.");
            }

            double latitude = (double)latitudeToken;
            double longitude = (double)longitudeToken;

            return (latitude, longitude);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting coordinates");
            throw;
        }
    }
}

public class WeatherService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<WeatherService> _logger;

    public WeatherService(HttpClient httpClient, ILogger<WeatherService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<Forecast> GetWeatherForecastAsync(double latitude, double longitude)
    {
        try
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"https://api.weather.gov/points/{latitude},{longitude}");
            request.Headers.Add("User-Agent", "YourAppName/1.0 (your.email@example.com)");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("Weather points response: {content}", content);
            var forecastUrl = JObject.Parse(content)["properties"]?["forecast"];

            if (forecastUrl == null)
            {
                throw new Exception("Forecast URL not found.");
            }

            var forecastRequest = new HttpRequestMessage(HttpMethod.Get, forecastUrl.ToString());
            forecastRequest.Headers.Add("User-Agent", "YourAppName/1.0 (your.email@example.com)");

            var forecastResponse = await _httpClient.SendAsync(forecastRequest);
            forecastResponse.EnsureSuccessStatusCode();
            var forecastContent = await forecastResponse.Content.ReadAsStringAsync();
            _logger.LogInformation("Weather forecast response: {forecastContent}", forecastContent);

            var forecast = JsonConvert.DeserializeObject<Forecast>(forecastContent)!;
            _logger.LogInformation("Parsed forecast: {forecast}", forecast);

            return forecast;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting the weather forecast");
            throw;
        }
    }
}