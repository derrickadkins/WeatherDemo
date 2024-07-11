import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TemperatureGraphProps {
  periods: any[];
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ periods }) => {
  // Filter periods into day and night
  const dayPeriods = periods.filter((period) => period.isDaytime);
  const nightPeriods = periods.filter((period) => !period.isDaytime);

  const data = {
    labels: dayPeriods.map((period) => period.name),
    datasets: [
      {
        label: "Daytime Temperature (°F)",
        data: dayPeriods.map((period) => period.temperature),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Nighttime Temperature (°F)",
        data: nightPeriods.map((period) => period.temperature),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Temperature Trend",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureGraph;
