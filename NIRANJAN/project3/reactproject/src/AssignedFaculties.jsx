import React, { useState } from "react";
import "./AssignedFaculties.css";

const AssignedFaculties = () => {
  const [faculties, setFaculties] = useState([]); // Initially empty array

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
        <nav className="sidebar">
          <ul>
            <li>Dashboard</li>
            <li>Store Details</li>
          </ul>
        </nav>

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
