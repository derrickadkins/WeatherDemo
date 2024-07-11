import React from "react";
import { format } from "date-fns";
import TemperatureTrendIcon from "./TemperatureTrendIcon";
import WindDirectionIcon from "./WindDirectionIcon";
import RainIcon from "./RainIcon";

interface DetailedForecastProps {
  periods: any[];
}

const DetailedForecast: React.FC<DetailedForecastProps> = ({ periods }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {periods.map((period: any, index: number) => {
        const currentTemp = period.temperature ?? 0;
        const previousTemp = index > 0 ? periods[index - 1].temperature ?? 0 : null;
        if (period.isDaytime && index < periods.length - 1) {
          const dayPeriod = period;
          const nightPeriod = periods[index + 1];
          const dayTemp = dayPeriod.temperature ?? 0;
          const nightTemp = nightPeriod?.temperature ?? 0;
          const previousDayTemp = index > 0 ? periods[index - 2]?.temperature ?? 0 : null;
          const previousNightTemp = index > 0 ? periods[index - 1]?.temperature ?? 0 : null;
          return (
            <div
              key={dayPeriod.number}
              className="p-2 bg-white rounded-lg border border-gray-200 flex-grow text-center">
              <h5 className="text-center text-lg font-semibold mb-2">{period.name}</h5>
              <div className="text-center mb-2">{format(new Date(period.startTime), "MMMM d, yyyy")}</div>
              <div className="grid grid-cols-2">
                <div>
                  <h6 className="text-center font-semibold">Daytime</h6>
                  <div className="grid grid-cols-2 items-center mb-2">
                    <img
                      src={dayPeriod.icon}
                      alt={dayPeriod.shortForecast}
                      className="w-auto h-auto rounded-lg mx-auto"
                    />
                    <div>
                      <p className="font-bold text-gray-700">
                        {dayTemp}° {dayPeriod.temperatureUnit}{" "}
                        <TemperatureTrendIcon currentTemp={dayTemp} previousTemp={previousDayTemp} />
                      </p>
                      <p className="text-gray-500 flex items-center justify-center">
                        <RainIcon />
                        {dayPeriod.probabilityOfPrecipitation.value ?? 0}%
                      </p>
                      <p className="text-gray-500 flex items-center justify-center">
                        <span className="mr-2">
                          <WindDirectionIcon direction={dayPeriod.windDirection} />
                        </span>
                        {dayPeriod.windSpeed} {dayPeriod.windDirection}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 p-2">{dayPeriod.detailedForecast}</p>
                </div>
                {nightPeriod && (
                  <div>
                    <h6 className="text-center font-semibold">Evening</h6>
                    <div className="grid grid-cols-2 items-center mb-2">
                      <img
                        src={nightPeriod.icon}
                        alt={nightPeriod.shortForecast}
                        className="w-auto h-auto rounded-lg mx-auto"
                      />
                      <div>
                        <p className="font-bold text-gray-700">
                          {nightTemp}° {nightPeriod.temperatureUnit}{" "}
                          <TemperatureTrendIcon currentTemp={nightTemp} previousTemp={previousNightTemp} />
                        </p>
                        <p className="text-gray-500 flex items-center justify-center">
                          <RainIcon />
                          {nightPeriod.probabilityOfPrecipitation.value ?? 0}%
                        </p>
                        <p className="text-gray-500 flex items-center justify-center">
                          <span className="mr-2">
                            <WindDirectionIcon direction={nightPeriod.windDirection} />
                          </span>
                          {nightPeriod.windSpeed} {nightPeriod.windDirection}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-500 p-2">{nightPeriod.detailedForecast}</p>
                  </div>
                )}
              </div>
            </div>
          );
        } else if ((index === 0 && period.name === "Tonight") || (index === periods.length - 1 && period.isDaytime)) {
          return (
            <div key={period.number} className="p-2 bg-white rounded-lg border border-gray-200 flex-grow text-center">
              <h5 className="text-center text-lg font-semibold mb-2">{period.name}</h5>
              <div className="text-center mb-2">{format(new Date(period.startTime), "MMMM d, yyyy")}</div>
              <div className="grid grid-cols-2 items-center mb-2">
                <img src={period.icon} alt={period.shortForecast} className="w-auto h-auto rounded-lg mx-auto" />
                <div>
                  <p className="font-bold text-gray-700">
                    {currentTemp}° {period.temperatureUnit}{" "}
                    <TemperatureTrendIcon currentTemp={currentTemp} previousTemp={previousTemp} />
                  </p>
                  <p className="text-gray-500 flex items-center justify-center">
                    <RainIcon />
                    {period.probabilityOfPrecipitation.value ?? 0}%
                  </p>
                  <p className="text-gray-500 flex items-center justify-center">
                    <span className="mr-2">
                      <WindDirectionIcon direction={period.windDirection} />
                    </span>
                    {period.windSpeed} {period.windDirection}
                  </p>
                </div>
              </div>
              <p className="text-gray-500">{period.detailedForecast}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default DetailedForecast;
