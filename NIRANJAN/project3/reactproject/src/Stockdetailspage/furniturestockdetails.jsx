 // furniturestockdetails.jsx
import React, { useState, useEffect } from "react";
import "./Stockdetails.css";
import { FaSearch, FaBars, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import { Link } from "react-router-dom";

const FSdetails = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/stocks", { // ✅ Fixed endpoint
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch stock details");

        const data = await response.json();
        console.log("Fetched Data:", data);

        setStocks(Array.isArray(data) ? data : []);
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
      <header className="sdheaderstockdetails">
        <h2>Furniture Stocks</h2>
        <div className="sdsearch-bar">
          <FaSearch className="sdsearch-icon" />
          <input type="text" placeholder="Search Item ID" />
        </div>
      </header>

      <table className="sdstock-table">
        <thead>
          <tr>
            <th>Item No</th>
            <th>Indent No</th>
            <th>Item Name</th>
            <th>Date of Invoice</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : error ? (
            <tr><td colSpan="6">Error: {error}</td></tr>
          ) : stocks.length === 0 ? (
            <tr><td colSpan="6">No furniture stock details found</td></tr>
          ) : (
            stocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.item_no}</td>
                <td>{stock.indent_no}</td>
                <td>{stock.item_name}</td>
                <td>{new Date(stock.date_of_invoice).toLocaleDateString()}</td>
                <td>{stock.description}</td>
                <td>{stock.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FSdetails;
