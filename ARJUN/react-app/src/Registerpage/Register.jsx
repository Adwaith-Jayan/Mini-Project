import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import registerimage from "../assets/loginimg.png";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    role: "",
    inventory: "",
  });

  const [message, setMessage] = useState(""); // For success/error messages
  const [loading, setLoading] = useState(false); // Show a loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);

      if (response.status === 201) {
        setMessage("✅ Registration successful! You can now log in.");
        setFormData({ firstName: "", email: "", password: "", role: "", inventory: "" });
      }
    } catch (error) {
      setMessage("❌ Registration failed. Try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="illustration">
          <img src={registerimage} alt="Illustration" />
        </div>
        <div className="register-form">
          <h1>Register</h1>
          <p><strong>Manage all your inventory efficiently</strong></p>
          <p>Get started by creating your account and setting up your work profile to access all features seamlessly.</p>

          {message && <p className="message">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                name="firstName" 
                placeholder="Enter your name" 
                value={formData.firstName} 
                onChange={handleChange} 
                required 
              />
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
                required
              >
                <option value="">Enter Role</option>
                <option value="Stock-In-Charge">Stock-In-Charge</option>
                <option value="Custodian">Custodian</option>
                <option value="Verifier">Verifier</option>
              </select>
            </div>

            <div className="input-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              <select 
                name="inventory" 
                value={formData.inventory} 
                onChange={handleChange} 
                required
              >
                <option value="">Enter Inventory eg. Lab.</option>
                <option value="Dbmslab">DBMS Lab</option>
                <option value="OSlab">OS Lab</option>
                <option value="networklab">Network Lab</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>

            <div className="input-full">
              <input 
                type="password" 
                name="password" 
                placeholder="Enter Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
