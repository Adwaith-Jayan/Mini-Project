import React, { useState, useEffect } from "react";
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
  const [inventoryList, setInventoryList] = useState([]); // For storing the list of inventories

  // Fetch inventory options from the database when the component mounts
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Room/inventory");
        setInventoryList(response.data); // Set inventory data from the backend
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    
    fetchInventory();
  }, []); // Empty dependency array means this runs once when the component mounts

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
                <option value="">Select Inventory</option>
                {inventoryList.map((room) => (
                  <option key={room._id} value={room.name}>{room.name}</option>
                ))}
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
