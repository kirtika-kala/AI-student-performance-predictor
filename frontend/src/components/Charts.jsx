import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Charts = ({ prediction, hours, attendance, previous }) => {
  if (!prediction) return null;

  // 👉 CATEGORY BASED ON SCORE
  const getCategory = () => {
    if (prediction >= 80) return "Excellent";
    if (prediction >= 60) return "Good";
    if (prediction >= 40) return "Average";
    return "Poor";
  };

  // 👉 PIE DATA
  const pieData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [prediction, 100 - prediction],
        backgroundColor: ["orange", "#ddd"],
      },
    ],
  };

  // 👉 BAR DATA
  const barData = {
    labels: ["Study Hours", "Attendance", "Previous Marks"],
    datasets: [
      {
        label: "Input Data",
        data: [hours, attendance, previous],
        backgroundColor: ["#ff7f50", "#36a2eb", "#4caf50"],
      },
    ],
  };

  return (
    <div style={{ display: "flex", gap: "50px", marginTop: "30px" }}>
      <div style={{ width: "300px" }}>
        <h3>Performance ({getCategory()})</h3>
        <Pie data={pieData} />
      </div>

      <div style={{ width: "400px" }}>
        <h3>Input Comparison</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;