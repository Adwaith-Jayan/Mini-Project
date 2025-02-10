import React, { useState } from "react";
import "./Stockdetails.css";
import { FaSearch, FaUser, FaBars, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import UpdateIcon from '@mui/icons-material/Update';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";




const Stockdetails = () => {
  const [stocks, setStocks] = useState([
    { id: "#7876", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen", price: "20000", status: "Working" },
    { id: "#7877", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen", price: "21000", status: "Not Working" },
    { id: "#7878", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", status: "Not Working" },
    { id: "#7879", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", status: "Working" },
    { id: "#7880", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", status: "Working" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFilterMenu = () => setFilterOpen(!filterOpen);

  return (
    <div className="sdstocks-container">
      {/* Sidebar */}
      <aside className={`sdsidebar ${sidebarOpen ? "open" : "closed"}`}>
        <FaBars className="sdmenu-icon" onClick={toggleSidebar} />
        {sidebarOpen && (
          <ul>
            <li></li>
                  <li></li>
                  <li><HomeIcon fontSize="medium"/>   Dashboard</li>
                  <li><InventoryIcon fontSize="medium"/><Link to="/stockdetails">   Stock Details</Link></li>
                  <li><UpdateIcon fontSize="medium"/> <Link to="/stockstatus"> Stock Status Update</Link> </li>
                  <li><HealthAndSafetyIcon fontSize="medium"/> <Link to="/stockwarranty"> Stock Warranty</Link></li>
                  <li><SendIcon fontSize="medium"/><Link to="/stocktransfer">   Stock Transfer</Link></li>
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
              <AccountMenu/>
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
                  <span className={`sdstatus-label ${stock.status === "Working" ? "working" : "not-working"}`}>
                    {stock.status}
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

export default Stockdetails;
