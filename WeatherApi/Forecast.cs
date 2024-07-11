using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace WeatherApi.Models
{
    public class Forecast
    {
        [JsonProperty("@context")]
        required public List<object> Context { get; set; }

        required public string Type { get; set; }
        required public Geometry Geometry { get; set; }
        required public Properties Properties { get; set; }
    }

    public class Geometry
    {
        required public string Type { get; set; }
        required public List<List<List<double>>> Coordinates { get; set; }
    }

    public class Properties
    {
        required public string Units { get; set; }
        required public string ForecastGenerator { get; set; }
        public DateTime GeneratedAt { get; set; }
        public DateTime UpdateTime { get; set; }
        required public string ValidTimes { get; set; }
        required public Elevation Elevation { get; set; }
        required public List<Period> Periods { get; set; }
    }

    public class Elevation
    {
        required public string UnitCode { get; set; }
        public double Value { get; set; }
    }

    public class Period
    {
        public int Number { get; set; }
        required public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsDaytime { get; set; }
        public int Temperature { get; set; }
        required public string TemperatureUnit { get; set; }
        required public object TemperatureTrend { get; set; }
        required public ProbabilityOfPrecipitation ProbabilityOfPrecipitation { get; set; }
        required public string WindSpeed { get; set; }
        required public string WindDirection { get; set; }
        required public string Icon { get; set; }
        required public string ShortForecast { get; set; }
        required public string DetailedForecast { get; set; }
    }

    public class ProbabilityOfPrecipitation
    {
        required public string UnitCode { get; set; }
        required public object Value { get; set; }
    }
}
