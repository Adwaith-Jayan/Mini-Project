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
      <aside className={`alsidebar ${sidebarOpen ? "open" : "closed"}`}>
              <FaBars className="almenu-icon" onClick={toggleSidebar} />
              {sidebarOpen && (
                <ul>
                  <li>Dashboard</li>
                </ul>
              )}
            </aside>

      {/* Main Content */}
      <div className="almain-content">
        <header className="header-assign">
          <div className="welcome-section">
            <p className="welcome-text">Welcome, <span>User</span></p>
            <p className="date-text">{today}</p>
          </div>
          <div className="header-icons">
            <FaSearch className="alsearch-icon" />
            <FaUser className="aluser-icon" />
          </div>
        </header>

        {/* Form Section */}
        <div className="alform-container">
          <h2 className="altitle">Assign Faculty</h2>
          <form className="alform">
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
            <div className="aldate-picker">
              <input type="date" />
              <FaCalendarAlt className="alcalendar-icon" />
            </div>
            <button className="alassign-btn">Assign</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignFaculty;
