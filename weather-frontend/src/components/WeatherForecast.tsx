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
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weather Forecast</h1>
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
        </div>
      </div>
      <div className="row mb-4 justify-content-center">
        <div className="col-auto">
          <button className="btn btn-primary" onClick={getForecast}>
            Get Forecast
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {forecast ? (
        <div>
          <h3>7 Day Forecast for {address}</h3>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {forecast.map((period: any) => (
              <div key={period.number} className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{period.name}</h5>
                    <p className="card-text">
                      {period.temperature} {period.temperatureUnit}
                    </p>
                    <p className="card-text">{period.shortForecast}</p>
                    <p className="card-text">{period.detailedForecast}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No forecast data available</p>
      )}
    </div>
  );
};

export default WeatherForecast;
