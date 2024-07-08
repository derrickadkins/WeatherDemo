import React from "react";
import WeatherForecast from "./components/WeatherForecast";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <WeatherForecast />
    </div>
  );
};

export default App;
