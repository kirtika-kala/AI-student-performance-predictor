import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend);

const Graph = ({ hours, prediction }) => {
  if (!prediction) return null;

  const data = {
    datasets: [
      {
        label: "Dataset",
        data: [
          { x: 2, y: 50 },
          { x: 4, y: 60 },
          { x: 6, y: 75 },
          { x: 8, y: 90 },
        ],
        backgroundColor: "blue",
      },
      {
        label: "Prediction",
        data: [{ x: Number(hours), y: prediction }],
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div style={{ width: "500px", marginTop: "40px" }}>
      <h3>Study vs Performance</h3>
      <Scatter data={data} />
    </div>
  );
};

export default Graph;