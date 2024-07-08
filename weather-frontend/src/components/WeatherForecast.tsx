import React, { useState } from "react";
import axios from "axios";

const WeatherForecast: React.FC = () => {
  const [address, setAddress] = useState("");
  const [forecast, setForecast] = useState<any>(null);

  const getForecast = async () => {
    try {
      const response = await axios.get(`/api/weather/forecast?address=${address}`);
      setForecast(response.data.properties.periods);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
      <button onClick={getForecast}>Get Forecast</button>
      {forecast && (
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
      )}
    </div>
  );
};

export default WeatherForecast;
