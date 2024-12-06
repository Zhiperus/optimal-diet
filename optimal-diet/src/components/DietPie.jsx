import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, Chart, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend, Title);

function DietPie({ foods, serving, colors }) {
  // Filter out foods with serving 0
  const filteredData = foods
    .map((food, index) => ({
      food,
      serving: serving[index],
      color: colors[index],
    }))
    .filter((item) => item.serving > 0);

  console.log(foods, serving);

  const filteredFoods = filteredData.map((item) => item.food);
  const filteredServing = filteredData.map((item) => item.serving);
  const filteredColors = filteredData.map((item) => item.color);

  return (
    <div className="relative flex flex-col items-center gap-5 w-full h-2/3">
      <Pie
        data={{
          labels: filteredFoods,
          datasets: [
            {
              label: "Servings",
              data: filteredServing,
              backgroundColor: filteredColors,
              hoverOffset: 4,
            },
          ],
        }}
        options={{
          maintainAspectRatio: true, // Chart maintains its proportions
          responsive: true, // Adapts to container size
          layout: { padding: 40 },
          plugins: {
            title: {
              display: true,
              text: "Servings",
              fullSize: true,
              padding: { top: 5, bottom: 20 },
            },
            legend: false,
            datalabels: {
              display: true,
              anchor: "end", // Positions text inside the segments
              align: "center", // Centers text alignment
              color: "white", // Keeps text color consistent
              font: { size: 14, weight: "bold" },
              textStrokeColor: "rgba(0, 0, 0, 0.7)", // Outline for better readability
              textStrokeWidth: 2,
              padding: 5, // Minimal padding to avoid overlap
              formatter: (val, ctx) => {
                const percentage = (
                  (ctx.chart.data.datasets[0].data[ctx.dataIndex] /
                    filteredServing.reduce(
                      (partialSum, a) => partialSum + a,
                      0
                    )) *
                  100
                ).toFixed(1); // Show one decimal point for clarity
                return `${
                  ctx.chart.data.labels[ctx.dataIndex]
                } (${percentage}%)`;
              },
            },
          },
        }}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}

export default DietPie;
