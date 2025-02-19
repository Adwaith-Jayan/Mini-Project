import React, { useState } from "react";
import "./ReportPage.css";

const ReportPage = () => {
  const [data, setData] = useState([]);

  return (
    <div className="page-container">
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="menu-icon">
          <i className="fas fa-bars"></i>
        </div>
        <div className="user-section">
          <i className="fas fa-search"></i>
          <i className="fas fa-bell"></i>
          <div className="user">
            <i className="fas fa-user"></i>
            <span>User ▾</span>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-item">
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <h2>Report</h2>
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Date of Invoice</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Remarks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-message">No data available</td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.date}</td>
                    <td>{row.itemName}</td>
                    <td>{row.description}</td>
                    <td>{row.remarks}</td>
                    <td>
                      <span className={`status-badge ${row.status === "Working" ? "working" : "not-working"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Approve Button */}
          <button className="approve-btn">
            Approve <i className="fas fa-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
