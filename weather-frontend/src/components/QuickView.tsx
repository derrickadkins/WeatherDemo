import React from "react";
import TemperatureTrendIcon from "./TemperatureTrendIcon";

interface QuickViewProps {
  periods: any[];
}

const QuickView: React.FC<QuickViewProps> = ({ periods }) => {
  const dayPeriods = periods.filter((period: any) => period.isDaytime || period.number === 1);

  return (
    <div className="bg-gray-100 p-2 rounded-lg mb-4">
      <div className="flex flex-wrap justify-around">
        {dayPeriods.map((period: any, index: number) => {
          const currentTemp = period.temperature ?? 0;
          const previousTemp = index > 0 ? dayPeriods[index - 1].temperature ?? 0 : null;
          return (
            <div key={period.number} className={`flex flex-col items-center p-2`}>
              <h5 className="text-center text-lg font-semibold mb-2">{period.name}</h5>
              <img src={period.icon} alt={period.shortForecast} className="w-auto h-auto mb-2 rounded-lg" />
              <p className="font-bold text-gray-700">
                {currentTemp}° {period.temperatureUnit}{" "}
                <TemperatureTrendIcon currentTemp={currentTemp} previousTemp={previousTemp} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickView;
