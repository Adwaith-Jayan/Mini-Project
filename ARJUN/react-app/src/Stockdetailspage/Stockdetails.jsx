import React, { useState, useEffect } from "react";
import "./Stockdetails.css";
import { FaSearch, FaUser, FaBars, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import { jwtDecode } from "jwt-decode";
import Sidebars from "../assets/sidebar";

const Stockdetails = () => {
  const [stocks, setStocks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFilterMenu = () => setFilterOpen(!filterOpen);

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

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token);
        const response = await fetch("http://localhost:5000/api/stock/stockdetails", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch stock details");
        const data = await response.json();
        console.log(data);
        setStocks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, []);

  return (
    <div className="sdstocks-container">
      {/* Sidebar */}
      <Sidebars sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role} />

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
              <th>Indent No</th>
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
                  <td>{stock.indent_no}</td>
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
