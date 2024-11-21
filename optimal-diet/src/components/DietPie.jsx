// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, Chart } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function DietPie({ foods, serving, colors }) {
  return (
    <div className="flex flex-col h-96 items-center gap-5">
      <Pie
        data={{
          labels: foods,
          datasets: [
            {
              label: "Food Pie",
              data: serving,
              backgroundColor: [...colors],
              hoverOffset: 4,
            },
          ],
        }}
        options={{
          showTooltips: true,
          tooltipEvents: ["mousemove", "touchstart", "touchmove"],
          tooltipFillColor: "rgba(0,0,0,0.8)",
        }}
      />
    </div>
  );
}
export default DietPie;
