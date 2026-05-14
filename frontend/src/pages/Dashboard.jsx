import React, { useState, useEffect } from "react";
import axios from "axios";
import Charts from "../components/Charts";
import Graph from "../components/Graph";
import "./Dashboard.css";

const Dashboard = () => {
  const name = localStorage.getItem("username");

  const [hours, setHours] = useState("");
  const [attendance, setAttendance] = useState("");
  const [previous, setPrevious] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get("http://127.0.0.1:5000/history");
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handlePredict = async () => {
    const res = await axios.post("http://127.0.0.1:5000/predict", {
      name,
      hours,
      attendance,
      previous,
    });

    setPrediction(res.data.prediction);
    fetchHistory();
  };

  return (
    <div className="main-full">

      <div className="top-header">
        <h1>Dashboard</h1>
      </div>

      <h2 className="welcome">Welcome, {name}</h2>

     
      <div className="cards">
        <div className="card">
          <h3>Study Hours</h3>
          <p>{hours || "--"}</p>
        </div>

        <div className="card">
          <h3>Attendance</h3>
          <p>{attendance || "--"}</p>
        </div>

        <div className="card highlight">
          <h3>Prediction</h3>
          <p>{prediction ? prediction.toFixed(2) : "--"}</p>
        </div>
      </div>

      
      <div className="inputs">
        <input
          type="number"
          placeholder="Study Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <input
          type="number"
          placeholder="Attendance %"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />

        <input
          type="number"
          placeholder="Previous Marks"
          value={previous}
          onChange={(e) => setPrevious(e.target.value)}
        />

        <button onClick={handlePredict}>Predict</button>
      </div>

      <div className="charts-section">
        <Charts
          prediction={prediction}
          hours={hours}
          attendance={attendance}
          previous={previous}
        />
      </div>

    
      <div className="graph-section">
        <h2>Performance Graph</h2>
        <Graph hours={hours} prediction={prediction} />
      </div>

    
      <div className="table-section">
        <h2>Prediction History</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Hours</th>
              <th>Attendance</th>
              <th>Previous</th>
              <th>Predicted</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.study_hours}</td>
                <td>{item.attendance}</td>
                <td>{item.previous_marks}</td>
                <td>{item.predicted_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;