import React, { useState } from "react";
import "./login.css";
import loginimage from "../assets/loginimg.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Reset error message before login attempt

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }), // ✅ Fixed key names
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Server error");
      }

      if (data.success) {
        navigate("/SicDash");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("❌ Login error:", error.message);
      if (error.message.includes("401")) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("Failed to connect to the server. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-header">
            <h1>Login</h1>
            <p>Login to your account</p>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-input">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-button">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <div className="login-image-container">
          <img src={loginimage} alt="Illustration" className="login-image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
