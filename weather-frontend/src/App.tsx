import React from "react";
import WeatherForecast from "./components/WeatherForecast";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <WeatherForecast />
    </div>
  );
};

export default App;
