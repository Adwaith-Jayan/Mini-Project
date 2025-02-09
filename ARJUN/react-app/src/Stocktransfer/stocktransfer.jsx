import React, { useState } from "react";
import "./Stocktransfer.css";
import { FaSearch, FaUser, FaBars, FaBell, FaFilter } from "react-icons/fa";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AccountMenu from "../assets/Usermenu";


const Stocktransfer = () => {
  const [stocks, setStocks] = useState([
    { id: "#7876", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen", price: "20000", Premise: "" },
    { id: "#7877", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen", price: "21000", Premise: "" },
    { id: "#7878", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", Premise: "" },
    { id: "#7879", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", Premise: "" },
    { id: "#7880", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL", price: "4000", Premise: "" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleFilterMenu = () => setFilterOpen(!filterOpen);

  const handleStatusChange = (index, newpremise) => {
    const updatedstocktransfer = [...stocks];
    updatedstocktransfer[index].Premise = newpremise;
    setStocks(updatedstocktransfer);
  };

  return (
    <div className="stocktransfercontainer">
      {/* Sidebar */}
      <aside className={`stsidebar ${sidebarOpen ? "open" : "closed"}`}>
        <FaBars className="stmenu-icon" onClick={toggleSidebar} />
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
      <div className="stmain-content">
        <header className="headerstocktransfer">
          <h2>Stock Transfer</h2>
          <div className="stsearch-bar">
            <FaSearch className="stsearch-icon" />
            <input type="text" placeholder="Search Item ID" />
            <input type="date" />
            <button className="stfilter-btn" onClick={toggleFilterMenu}>
              <FaFilter /> Filter
            </button>
          </div>
          <div className="sttransferbtn">
          <Button variant="contained" endIcon={<SendIcon />}>
            Transfer</Button>
          </div>
          <div className="stheader-icons">
            <FaBell className="stnotification-icon" />
            <div className="stuser-menu">
              <AccountMenu/>
            </div>
            
          </div>
        </header>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="stfilter-menu">
            <label>Product:
              <select className="stfilter">
                <option value="all">All</option>
                <option value="CPU">CPU</option>
                <option value="Monitor">Monitor</option>
              </select>
            </label>
          </div>
        )}

        {/* Stock Table */}
        <table className="ststock-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Date of Invoice</th>
              <th>Date of Indent</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Tranfer To</th>
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
                    className="premise-dropdown" value={stock.Premise}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="">Select Premise</option>
                    <option value="Lab 1">Lab 1</option>
                    <option value="Lab 2">Lab 2</option>
                    <option value="Lab 3">Lab 3</option>
                    <option value="Lab 4">Lab 4</option>
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

export default Stocktransfer;
