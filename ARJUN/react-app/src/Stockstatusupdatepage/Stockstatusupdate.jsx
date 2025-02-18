import React, { useState,useEffect } from "react";
import "./Stockstatusupdate.css";
import { FaSearch, FaUser, FaBars, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import UpdateIcon from '@mui/icons-material/Update';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SendIcon from '@mui/icons-material/Send';
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Sidebars from "../assets/sidebar";


const Stockstatusupdate = () => {
  const [stocks, setStocks] = useState([
    { id: "#7876", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen", price: "20000", status: "Working" },
    { id: "#7877", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen", price: "21000", status: "Not Working" },
    { id: "#7878", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", status: "Not Working" },
    { id: "#7879", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", status: "Working" },
    { id: "#7880", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", status: "Working" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [role, setRole] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFilterMenu = () => setFilterOpen(!filterOpen);

  const handleStatusChange = (index, newStatus) => {
    const updatedStocks = [...stocks];
    updatedStocks[index].status = newStatus;
    setStocks(updatedStocks);
  };
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode token to get user info
        setRole(decoded.designation);
      } catch (error) {
        console.error("Invalid Token:", error);
      }
    }
  }, []);

  return (
    <div className="stock-container">
      {/* Sidebar */}
      
      <Sidebars sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role} />

      {/* Main Content */}
      <div className="main-content">
        <header className="headerstockdetails">
          <h2>Stocks</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search Item ID" />
            <input type="date" />
            <button className="filter-btn" onClick={toggleFilterMenu}>
              <FaFilter /> Filter
            </button>
          </div>

          <div className="header-icons">
            <FaBell className="notification-icon" />
            <div className="user-menu">
              <AccountMenu/>
            </div>
          </div>
        </header>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="filter-menu">
            <label>Status:
              <select>
                <option value="all">All</option>
                <option value="Working">Working</option>
                <option value="Not Working">Not Working</option>
              </select>
            </label>
            <label>Product:
              <select>
                <option value="all">All</option>
                <option value="CPU">CPU</option>
                <option value="Monitor">Monitor</option>
              </select>
            </label>
          </div>
        )}

        {/* Stock Table */}
        <table className="stock-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Date of Invoice</th>
              <th>Date of Indent</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.id}</td>
                <td>{stock.invoice}</td>
                <td>{stock.indent}</td>
                <td>{stock.name}</td>
                <td>{stock.description}</td>
                <td>{stock.price}</td>
                <td>
                  <select
                    className={`status-dropdown ${stock.status === "Working" ? "working" : "not-working"}`}
                    value={stock.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Working">Working</option>
                    <option value="Not Working">Not Working</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stockstatusupdate;
