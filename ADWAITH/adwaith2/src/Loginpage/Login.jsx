import React, { useState } from "react";
import "./login.css";
import loginimage from "../assets/loginimg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      alert(response.data.message);
      
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      
      const role = response.data.designation;
      console.log(role);
      if (role.toLowerCase() === "hodcse") {
        navigate("/Hoddash");
      }
      else if(role.toLowerCase()==="stock-in-charge" || role.toLowerCase()==="furniture-custodian" )
      {
        navigate("/Sicdash");
      }
      else if(role.toLowerCase()==="custodian")
      {
        navigate("/custdash");
      }
      else if(role.toLowerCase()==="principal")
      {
        navigate("/principaldash");
      }
      else if(role.toLowerCase()==="verifier")
      {
        navigate("/verifydash");
      }
      else if(role.toLowerCase()==="furniture-verifier")
      {
        navigate("/verifydash");
      }
      else if(role.toLowerCase()==="tsk")
        {
          navigate("/Tskdash");
        }
    } catch (error) {
      alert(error.response ? error.response.data.message : "Something went wrong");
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
            <div className="login-input password-input">
              <label htmlFor="password">Password*</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
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
          <img src={loginimage} alt="Illustration" className="login-image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
