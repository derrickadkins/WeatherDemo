import React from "react";
import { format } from "date-fns";
import TemperatureTrendIcon from "./TemperatureTrendIcon";

interface DetailedForecastProps {
  periods: any[];
}

const DetailedForecast: React.FC<DetailedForecastProps> = ({ periods }) => {
  const getWindDirectionIcon = (direction: string) => {
    return "→"; // Placeholder arrow
  };

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
                        <svg className="inline-block w-5 h-5 mr-1" viewBox="0 -2 5 10" fill="#ADD8E6">
                          <title>Rain</title>
                          <path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"></path>
                        </svg>
                        {dayPeriod.probabilityOfPrecipitation.value ?? 0}%
                      </p>
                      <p className="text-gray-500 flex items-center justify-center">
                        {/* <span className="inline-block mr-1">{getWindDirectionIcon(dayPeriod.windDirection)}</span> */}
                        {dayPeriod.windSpeed} {dayPeriod.windSpeedUnit} {dayPeriod.windDirection}
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
                          <svg className="inline-block w-5 h-5 mr-1" viewBox="0 -2 5 10" fill="#ADD8E6">
                            <title>Rain</title>
                            <path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"></path>
                          </svg>
                          {nightPeriod.probabilityOfPrecipitation.value ?? 0}%
                        </p>
                        <p className="text-gray-500 flex items-center justify-center">
                          {/* <span className="inline-block mr-1">{getWindDirectionIcon(nightPeriod.windDirection)}</span> */}
                          {nightPeriod.windSpeed} {nightPeriod.windSpeedUnit} {nightPeriod.windDirection}
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
                    <svg className="inline-block w-5 h-5 mr-1" viewBox="0 -2 5 10" fill="#ADD8E6">
                      <title>Rain</title>
                      <path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"></path>
                    </svg>
                    {period.probabilityOfPrecipitation.value ?? 0}%
                  </p>
                  <p className="text-gray-500 flex items-center justify-center">
                    {/* <span className="inline-block mr-1">{getWindDirectionIcon(period.windDirection)}</span> */}
                    {period.windSpeed} {period.windSpeedUnit} {period.windDirection}
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
