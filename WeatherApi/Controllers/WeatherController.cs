using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly GeocodingService _geocodingService;
    private readonly WeatherService _weatherService;

    public WeatherController(GeocodingService geocodingService, WeatherService weatherService)
    {
        _geocodingService = geocodingService;
        _weatherService = weatherService;
    }

    [HttpGet("forecast")]
    public async Task<IActionResult> GetWeatherForecast([FromQuery] string address)
    {
        var (latitude, longitude) = await _geocodingService.GetCoordinatesAsync(address);
        var forecast = await _weatherService.GetWeatherForecastAsync(latitude, longitude);
        return Ok(forecast);
    }
}
