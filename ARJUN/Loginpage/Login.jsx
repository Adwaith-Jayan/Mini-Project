import React, { useState } from "react";
import "./login.css";
import loginimage from "../assets/loginimg.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-header">
            <h1>Login</h1>
            <p>Login your account</p>
          </div>
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
            <div className="login-checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
              <a className="login-forgot" href="#">Forgot password?</a>
            </div>
            <div className="login-button">
              <button type="submit">Login</button>
            </div>
            
          </form>
        </div>
        <div className="login-image-container">
          <img
            src= {loginimage}
            alt="Illustration"
            className="login-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
