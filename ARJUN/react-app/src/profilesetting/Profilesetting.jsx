import React, { useState } from "react";
import "./profile.css";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaSearch, FaUser, FaBars, FaBell, FaFilter } from "react-icons/fa";
import ProfileMenu from "../assets/profileuser";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import UpdateIcon from '@mui/icons-material/Update';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";


const UserProfile = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    };

  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    email: "user@gmail.com",
  });

  const handleEdit = (e) => {
    setIsEditable(true); 
  };
  const handleditsubmit=(e)=>{
    setIsEditable(false);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profilepage">
    <div className="profile-container">
      <aside className={`pssidebar ${sidebarOpen ? "open" : "closed"}`}>
              <FaBars className="psmenu-icon" onClick={toggleSidebar} />
              {sidebarOpen && (
                <ul>
                  <li></li>
                  <li></li>
                  <li><HomeIcon fontSize="medium"/>   Dashboard</li>
                  <li><InventoryIcon fontSize="medium"/><Link to="/stockdetails">   Stock Details</Link></li>
                  <li><UpdateIcon fontSize="medium"/> <Link to="/stockstatus"> Stock Status Update</Link> </li>
                  <li><HealthAndSafetyIcon fontSize="medium"/> <Link to="/stockwarranty"> Stock Warranty</Link></li>
                  <li><SendIcon fontSize="medium"/><Link to="/stocktransfer">   Stock Transfer</Link></li>
                </ul>
              )}
            </aside>

      <div className="profile-content">
        <header className="profile-header">
          <h2>Welcome, User</h2>
          <div className="psheader-icons">
            <FaBell className="psnotification-icon" />
            <ProfileMenu/>
          </div>
        </header>

        <div className="profile-card">
          <div className="profile-info">
            <FaUserCircle className="profile-icon" />
            <div>
              <h3>User</h3>
              <p>{formData.email}</p>
            </div>
            <button className="edit-btn" onClick={handleEdit}><FiEdit /> Edit</button>
          </div>

          <div className="profile-form">
            <div className="psform-group">
              <label>Full Name</label>
              <input type="text" name="fullName" placeholder="Your First Name" value={formData.fullName} onChange={handleChange}
                  disabled={!isEditable} />
            </div>

            <div className="psform-group">
              <label>Designation</label>
              <textarea value={formData.designation} disabled/>
            </div>
          </div>

          <div className="psemail-section">
            <h4>My email Address</h4>
            <p>{formData.email}</p>
            <button className="add-email-btn"><IoIosAddCircleOutline /> Add Email Address</button>
          </div>

          <button className="change-password-btn">Change Password</button>
          <div className="submit-btn-container">
          <Button className="Submiteditbtn" variant="contained" onClick={handleditsubmit}>Submit</Button>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
