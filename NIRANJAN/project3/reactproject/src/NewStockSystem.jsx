import React from "react";
import "./NewStockSystem.css";

const NewStockSystem = () => {
    return (
        <div className="container">
            {/* Sidebar */}
            <div className="sidebar">
                <a href="#">Dashboard</a>
                <a href="#">Stock Status</a>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="header">
                    <h1>Welcome, User</h1>
                    <span className="search-icon">🔍</span>
                </div>

                <div className="form-container">
                    <div className="form-title-container">
                        <h2 className="form-title">
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
