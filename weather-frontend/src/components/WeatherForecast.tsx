import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
      <button onClick={getForecast}>Get Forecast</button>
      {error && <p>{error}</p>}
      {forecast ? (
        <div>
          <h3>7 Day Forecast for {address}</h3>
          {forecast.map((period: any) => (
            <div key={period.number}>
              <h4>{period.name}</h4>
              <p>
                {period.temperature} {period.temperatureUnit}
              </p>
              <p>{period.shortForecast}</p>
              <p>{period.detailedForecast}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forecast data available</p>
      )}
    </div>
  );
};

export default WeatherForecast;
