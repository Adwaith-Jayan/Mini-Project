import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./AssignedFaculties.css";

const AssignedFaculties = () => {
  const [faculties, setFaculties] = useState([]); 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="page-container">
      {/* Top Navigation Bar */}
      <header className="top-navbar">
        <div className="menu-icon">☰</div>
        <div className="user-section">
          <span className="icon">🔍</span>
          <span className="icon">🔔</span>
          <span className="user">👤 User ▾</span>
        </div>
      </header>

      <div className="container">
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
          <h2>Assigned Faculties</h2>
          <div className="search-filter">
            <input type="text" placeholder="Search Item" />
            <button className="filter-btn">Filter</button>
          </div>

          {/* Table */}
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Name</th>
                <th>Premise</th>
                <th>Email</th>
                <th>Date of Assignation</th>
                <th>Last Date to Verify</th>
              </tr>
            </thead>
            <tbody>
              {faculties.length > 0 ? (
                faculties.map((faculty, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td>{faculty.name}</td>
                    <td>{faculty.premise}</td>
                    <td>{faculty.email}</td>
                    <td>{faculty.assignedDate}</td>
                    <td>{faculty.verifyDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-message">No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Create Account Button */}
          <button className="create-btn">Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default AssignedFaculties;
