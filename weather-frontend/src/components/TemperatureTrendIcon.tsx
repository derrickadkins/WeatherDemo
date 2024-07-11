import React from "react";

interface TemperatureTrendIconProps {
  currentTemp: number;
  previousTemp: number | null;
}

const TemperatureTrendIcon: React.FC<TemperatureTrendIconProps> = ({ currentTemp, previousTemp }) => {
  if (previousTemp === null) {
    return null;
  } else if (currentTemp > previousTemp) {
    return <span style={{ color: "red" }}>↑</span>;
  } else if (currentTemp < previousTemp) {
    return <span style={{ color: "blue" }}>↓</span>;
  } else {
    return null;
  }
};

export default TemperatureTrendIcon;
