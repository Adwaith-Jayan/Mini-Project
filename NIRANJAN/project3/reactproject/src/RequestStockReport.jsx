import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "./RequestStockReport.css";

const RequestStockReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="page-container">
      {/* Top Navigation Bar */}
      <header className="top-navbar">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        
        <div className="user-section">
          <FiSearch className="icon" />
          <IoMdNotificationsOutline className="icon" />
          <span className="user">
            <FaUserCircle className="user-icon" /> User ▾
          </span>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={sidebarOpen ? "nssidebar open" : "nssidebar closed"}>
          <FaBars className="nsmenu-icon" onClick={toggleSidebar} />
          {sidebarOpen && (
            <ul>
              <li>Dashboard</li>
              <li>Stock Details</li>
            </ul>
          )}
      </aside>

      {/* Main Content */}
      <div className="content">
        <div className="report-container">
          {/* Report Header - Title and Request Button in One Line */}
          <div className="report-header">
            <h2 className="page-title">Request Stock Report</h2>
            <button className="request-btn">+ Request</button>
          </div>

          {/* Report Form */}
          <div className="report-form">
            <div className="form-section">
              <h3>Department</h3>
              <div className="dropdown">Department ▾</div>
            </div>
            <div className="form-section">
              <h3>Premise</h3>
              <div className="dropdown">Premise ▾</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestStockReport;
