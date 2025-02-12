import React, { useState } from "react";
import "./AssignFaculty.css";
import { FaBars, FaUser, FaSearch, FaCalendarAlt } from "react-icons/fa";

const AssignFaculty = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long", 
    year: "numeric",
  });

  return (
    <div className="assignfaculty-container">
      {/* Sidebar */}
      <aside className={`assisidebar ${sidebarOpen ? "open" : "closed"}`}>
              <FaBars className="assimenu-icon" onClick={toggleSidebar} />
              {sidebarOpen && (
                <ul>
                  <li>Dashboard</li>
                </ul>
              )}
            </aside>

      {/* Main Content */}
      <div className="assimain-content">
        <header className="assiheader-assign">
          <div className="assiwelcome-section">
            <p className="assiwelcome-text">Welcome, <span>User</span></p>
            <p className="assidate-text">{today}</p>
          </div>
          <div className="assiheader-icons">
            <FaSearch className="assisearch-icon" />
            <FaUser className="assiuser-icon" />
          </div>
        </header>

        {/* Form Section */}
        <div className="assiform-container">
          <h2 className="assititle">Assign Faculty</h2>
          <form className="assiform">
            <input type="text" placeholder="Enter name of faculty" />
            <input type="email" placeholder="Enter Email of faculty" />
            <select>
              <option>Enter department</option>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical</option>
            </select>
            <select>
              <option>Enter premise</option>
              <option>Building A</option>
              <option>Building B</option>
            </select>
            <div className="assidate-picker">
              <input type="date" />
              <FaCalendarAlt className="assicalendar-icon" />
            </div>
            <button className="assiassign-btn">Assign</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignFaculty;
