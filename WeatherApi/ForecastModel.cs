using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace WeatherApi.Models
{
    public class ForecastModel
    {
        [JsonProperty("@context")]
        public List<object> Context { get; set; }

        public string Type { get; set; }
        public Geometry Geometry { get; set; }
        public Properties Properties { get; set; }
    }

    public class Geometry
    {
        public string Type { get; set; }
        public List<List<List<double>>> Coordinates { get; set; }
    }

    public class Properties
    {
        public string Units { get; set; }
        public string ForecastGenerator { get; set; }
        public DateTime GeneratedAt { get; set; }
        public DateTime UpdateTime { get; set; }
        public string ValidTimes { get; set; }
        public Elevation Elevation { get; set; }
        public List<Period> Periods { get; set; }
    }

    public class Elevation
    {
        public string UnitCode { get; set; }
        public double Value { get; set; }
    }

    public class Period
    {
        public int Number { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsDaytime { get; set; }
        public int Temperature { get; set; }
        public string TemperatureUnit { get; set; }
        public object TemperatureTrend { get; set; }
        public ProbabilityOfPrecipitation ProbabilityOfPrecipitation { get; set; }
        public string WindSpeed { get; set; }
        public string WindDirection { get; set; }
        public string Icon { get; set; }
        public string ShortForecast { get; set; }
        public string DetailedForecast { get; set; }
    }

    public class ProbabilityOfPrecipitation
    {
        public string UnitCode { get; set; }
        public object Value { get; set; }
    }
}
