import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Home as HomeIcon, Inventory, Update, HealthAndSafety, Send } from "@mui/icons-material";
import "./AddStock.css"; // Ensure this file is correctly linked

const AddStock = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="addstock-container">
            <AddStockHeader />
            <div className="addstock-main-area">
                <AddStockSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <AddStockContent />
            </div>
        </div>
    );
};

const AddStockHeader = () => (
    <header className="addstock-header">
        <div className="addstock-header-left">
            <span>Welcome, User</span>
            <span>Thu 16 January 2025</span>
        </div>
        <div className="addstock-header-right">
            <span>Premise Name</span>
            <AccountMenu />
        </div>
    </header>
);

const AddStockSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <aside className={`addstock-sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <FaBars className="addstock-menu-icon" onClick={toggleSidebar} />
            {sidebarOpen && (
                <ul>
                    <li><Link to="/Hoddash"><HomeIcon fontSize="medium" /> Dashboard</Link></li>
                    <li><Link to="/stockdetails"><Inventory fontSize="medium" /> Stock Details</Link></li>
                    <li><Link to="/stockstatus"><Update fontSize="medium" /> Stock Status Update</Link></li>
                    <li><Link to="/stockwarranty"><HealthAndSafety fontSize="medium" /> Stock Warranty</Link></li>
                    <li><Link to="/stocktransfer"><Send fontSize="medium" /> Stock Transfer</Link></li>
                </ul>
            )}
        </aside>
    );
};

const AddStockContent = () => {
    return (
        <div className="addstock-content-area">
            <h2>Add Stock Items</h2>
            <form className="addstock-form">
                <label>Item Name:</label>
                <input type="text" placeholder="Enter item name" />

                <label>Quantity:</label>
                <input type="number" placeholder="Enter quantity" />

                <label>Category:</label>
                <select>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Stationery</option>
                </select>

                <label>Price:</label>
                <input type="number" placeholder="Enter price" />

                <button type="submit">Add Stock</button>
            </form>
        </div>
    );
};

const AccountMenu = () => (
    <div className="account-menu">
        <span>🔽</span>
    </div>
);

export default AddStock;
