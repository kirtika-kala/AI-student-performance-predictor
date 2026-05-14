import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name) {
      alert("Enter your name");
      return;
    }

    localStorage.setItem("username", name);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h1>Student Performance Predictor</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleLogin}>Enter Dashboard</button>
    </div>
  );
};

export default Login;