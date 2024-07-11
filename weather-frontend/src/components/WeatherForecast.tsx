import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import QuickView from "./QuickView";
import TemperatureGraph from "./TemperatureGraph";
import DetailedForecast from "./DetailedForecast";

const WeatherForecast: React.FC = () => {
  const [address, setAddress] = useState("");
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getForecast = async () => {
    setError(null); // Reset any previous error
    try {
      const response = await axios.get(`/api/weather/forecast?address=${address}`);
      console.log("Full forecast response:", response.data);
      const periods = response.data?.properties?.periods;
      if (periods) {
        setForecast(periods);
        console.log("Forecast periods:", periods);
      } else {
        setError("Unable to retrieve forecast data");
      }
    } catch (error) {
      console.error("Error fetching forecast:", error);
      setError("Error fetching forecast data");
    }
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-center text-3xl font-bold mb-4">Weather Forecast</h1>
      <div className="flex flex-col items-center mb-4">
        <input
          type="text"
          className="form-input w-64 border border-gray-300 rounded-md p-2 mb-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
        <button className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md" onClick={getForecast}>
          Get Forecast
        </button>
      </div>
      {error && <div className="alert alert-danger text-red-500 mb-4">{error}</div>}
      {forecast ? (
        <div>
          <QuickView periods={forecast} />
          <TemperatureGraph periods={forecast} />
          <h3 className="text-xl font-semibold mb-4 text-center">7 Day Forecast for {address}</h3>
          <DetailedForecast periods={forecast} />
        </div>
      ) : (
        <p className="text-center">No forecast data available</p>
      )}
    </div>
  );
};

export default WeatherForecast;
