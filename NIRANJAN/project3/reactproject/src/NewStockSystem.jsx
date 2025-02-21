import React, { useState } from "react";
import "./NewStockSystem.css";
import { FaBars, FaUser, FaSearch, FaCalendarAlt } from "react-icons/fa";

const NewStockSystem = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="nscontainer">
            {/* Sidebar */}
            <aside className={`nssidebar ${sidebarOpen ? "open" : "closed"}`}>
                <FaBars className="nsmenu-icon" onClick={toggleSidebar} />
                {sidebarOpen && (
                    <ul>
                        <li>Dashboard</li>
                    </ul>
                )}
            </aside>

            {/* Main Content */}
            <div className="nsmain-content">
                <div className="nsheader">
                    <h1>Welcome, User</h1>
                    <span className="search-icon">🔍</span>
                </div>

                <div className="nsform-container">
                    <div className="nsform-title-container">
                        <h2 className="nsform-title">
                            New Stock <span>System</span>
                        </h2>
                    </div>
                    <input type="text" className="input-field" placeholder="Enter name of Premise" />
                    <input type="text" className="input-field" placeholder="Enter Room no" />
                    <input type="text" className="input-field" placeholder="Enter Type" />
                    <button className="submit-btn">Create</button>
                </div>
            </div>
        </div>
    );
};

export default NewStockSystem;
