import React, { useState, useEffect } from "react";
import "./Stockdetails.css";
import { FaSearch, FaBars, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import UpdateIcon from '@mui/icons-material/Update';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";

const Stockdetails = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await fetch("http://localhost:5000/stockdetails", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch stock details");

        const data = await response.json();
        setStocks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFilterMenu = () => setFilterOpen(!filterOpen);

  return (
    <div className="sdstocks-container">
      {/* Sidebar */}
      <aside className={`sdsidebar ${sidebarOpen ? "open" : "closed"}`}>
        <FaBars className="sdmenu-icon" onClick={toggleSidebar} />
        {sidebarOpen && (
          <ul>
            <li><HomeIcon fontSize="medium" /> Dashboard</li>
            <li><InventoryIcon fontSize="medium" /><Link to="/stockdetails"> Stock Details</Link></li>
            <li><UpdateIcon fontSize="medium" /><Link to="/stockstatus"> Stock Status Update</Link></li>
            <li><HealthAndSafetyIcon fontSize="medium" /><Link to="/stockwarranty"> Stock Warranty</Link></li>
            <li><SendIcon fontSize="medium" /><Link to="/stocktransfer"> Stock Transfer</Link></li>
          </ul>
        )}
      </aside>

      {/* Main Content */}
      <div className="sdmain-content">
        <header className="sdheaderstockdetails">
          <h2>Stocks</h2>
          <div className="sdsearch-bar">
            <FaSearch className="sdsearch-icon" />
            <input type="text" placeholder="Search Item ID" />
          </div>
          <input className="datetype" type="date" />
          <button className="sdfilter-btn" onClick={toggleFilterMenu}>
            <FaFilter /> Filter
          </button>

          <div className="newbuttons">
            <button className="sdexport-btn">Export</button>
            <button className="sdnew-item-btn">+ New Items</button>
          </div>

          <div className="sdheader-icons">
            <FaBell className="sdnotification-icon" />
            <div className="sduser-menu">
              <AccountMenu />
            </div>
          </div>
        </header>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="sdfilter-menu">
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
        <table className="sdstock-table">
          <thead>
            <tr>
              <th>Item No</th>
              <th>Ident No</th>
              <th>Item Name</th>
              <th>Date of Invoice</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="7">Error: {error}</td></tr>
            ) : stocks.length === 0 ? (
              <tr><td colSpan="7">No stock details found</td></tr>
            ) : (
              stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.item_no}</td>
                  <td>{stock.ident_no}</td>
                  <td>{stock.item_name}</td>
                  <td>{new Date(stock.date_of_invoice).toLocaleDateString()}</td>
                  <td>{stock.description}</td>
                  <td>{stock.price}</td>
                  <td>
                    <span className={`sdstatus-label ${stock.status === "Working" ? "working" : "not-working"}`}>
                      {stock.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stockdetails;
