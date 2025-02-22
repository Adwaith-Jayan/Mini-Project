import React, { useState,useEffect } from "react";
import "./maintenancelist.css";
import { FaSearch, FaUser, FaBars, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import { jwtDecode } from "jwt-decode";
import Sidebars from "../assets/sidebar";


const MaintenanceList = () => {
  const [maintenance, setMaintenance] = useState([
    { id: "#7677", date: "30/08/2024", name: "CPU", provider: "Servicer2", remarks:" ", status: "Not Working" },
    { id: "#7678", date: "28/08/2024", name: "Monitor", provider: "Servicer1",remarks: " ", status: "Not Working" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [checkedMaintenance, setCheckedMaintenance] = useState({});
  const [role, setRole] = useState(null);

  //const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFilterMenu = () => setFilterOpen(!filterOpen);
  const handleCheckboxChange = (id) => {
    setCheckedMaintenance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setRole(decoded.designation);
        } catch (error) {
          console.error("Invalid Token:", error);
        }
      }
    }, []);

  return (
    <div className="maintenancelist-container">
      {/* Sidebar */}
      <Sidebars sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role} />

      {/* Main Content */}
      <div className="mlmain-content">
        <header className="header-maintenance">
          <h2>Maintenance List</h2>
          <div className="mlsearch-bar">
            <FaSearch className="mlsearch-icon" />
            <input type="text" placeholder="Search Item ID" />
          </div>
          <input className="mldatetype" type="date" />
          <button className="mlfilter-btn" onClick={toggleFilterMenu}>
            <FaFilter /> Filter
          </button>
          

          <div className="mlheader-icons">
            <FaBell className="mlnotification-icon" />
            <div className="mluser-menu">
              <AccountMenu/>
            </div>
          </div>
        </header>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="mlfilter-menu">
            <label>Status:
              <select>
                <option value="all">All</option>
                <option value="Working">Working</option>
                <option value="Not Working">Not Working</option>
              </select>
            </label>
            <label>Service Provider:
              <select>
                <option value="all">All</option>
                <option value="Servicer1">Servicer1</option>
                <option value="Servicer2">Servicer2</option>
              </select>
            </label>
          </div>
        )}

        {/* Maintenance Table */}
        <table className="mlmaintenance-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Date of Repair</th>
              <th>Item Name</th>
              <th>Service Provider</th>
              <th>Remarks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {maintenance.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.provider}</td>
                <td>{item.remarks}</td>
                <td>
                  <span className={`mlstatus-label ${item.status === "Working" ? "working" : "not-working"}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceList;
