import React, { useState } from "react";
import "./stockclear.css";
import { FaSearch, FaUser, FaBars, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const Stockclears = () => {
  const [stocks, setStocks] = useState([
    { id: "#7876", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen", status: "Not Working" },
    { id: "#7877", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen", status: "Not Working" },
    { id: "#7878", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", status: "Not Working" },
    { id: "#7879", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", status: "Not Working" },
    { id: "#7880", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", status: "Not Working" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [checkedStocks, setCheckedStocks] = useState({});

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFilterMenu = () => setFilterOpen(!filterOpen);
  const handleCheckboxChange = (id) => {
    setCheckedStocks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="clearstocks-container">
      {/* Sidebar */}
      <aside className={`clsidebar ${sidebarOpen ? "open" : "closed"}`}>
        <FaBars className="clmenu-icon" onClick={toggleSidebar} />
        {sidebarOpen && (
          <ul>
            <li>Dashboard</li>
            <li>Stock Details</li>
            <li>Stock Status Update</li>
            <li>Stock Warranty</li>
            <li>Stock Transfer</li>
          </ul>
        )}
      </aside>

      {/* Main Content */}
      <div className="clmain-content">
        <header className="headerstockclears">
          <h2>Stock Clearence</h2>
          <div className="clsearch-bar">
            <FaSearch className="clsearch-icon" />
            <input type="text" placeholder="Search Item ID" />
            </div>
            <input className="cldatetype" type="date" />
            <button className="clfilter-btn" onClick={toggleFilterMenu}>
              <FaFilter /> Filter
            </button>
            
            <div className="clnewbuttons">
            <Button variant="contained" endIcon={<DeleteIcon />}>Clear Stocks</Button>
          </div>

          <div className="clheader-icons">
            <FaBell className="clnotification-icon" />
            <div className="cluser-menu">
              <AccountMenu/>
            </div>
          </div>
        </header>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="clfilter-menu">
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
        <table className="clstock-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Item ID</th>
              <th>Date of Invoice</th>
              <th>Date of Indent</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td>
                <input
                  type="checkbox"
                  checked={checkedStocks[stock.id] || false}
                  onChange={() => handleCheckboxChange(stock.id)}
                />
                </td>
                <td>{stock.id}</td>
                <td>{stock.invoice}</td>
                <td>{stock.indent}</td>
                <td>{stock.name}</td>
                <td>{stock.description}</td>
                <td>
                  <span className={`clstatus-label ${stock.status === "Working" ? "working" : "not-working"}`}>
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

export default Stockclears;
