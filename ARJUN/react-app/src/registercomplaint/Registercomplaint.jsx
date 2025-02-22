import React, { useState, useEffect } from "react";
import "./registercomplaint.css";
import { FaSearch, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import { jwtDecode } from "jwt-decode";
import Sidebars from "../assets/sidebar";
import Button from "@mui/material/Button";
import axios from "axios";

const RegisterComplaint = () => {
  const [stocks, setStocks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/registercomplaint", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data);
        const filteredData = Array.isArray(response.data) ? response.data.filter(
            (stock) => stock.status === "Not Working" && !stock.maintenance_date
        ) : [];
        console.log("Filtered Data:", filteredData);
        setStocks(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.item_no === item.item_no)
        ? prev.filter((selected) => selected.item_no !== item.item_no)
        : [...prev, item]
    );
  };

  const handleSubmitComplaint = () => {
    if (selectedItems.length === 0) {
      alert("No items selected for complaint.");
      return;
    }

    const emailBody = selectedItems
      .map(
        (item) =>
          `Item No: ${item.item_no}\nItem Name: ${item.item_name}\nDescription: ${item.description}\nPrice: ${item.price}\nStatus: ${item.status}\n`
      )
      .join("\n");

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Complaint%20Submission&body=From:%20ritstocksystem@gmail.com%0A%0ASelected%20Items%20for%20Complaint:%0A${encodeURIComponent(
      emailBody
    )}`;

    window.open(gmailLink, "_blank");
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.item_no.toString().includes(searchTerm)
  );

  return (
    <div className="rgstocks-container">
      <Sidebars
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        role={role}
      />

      <div className="rgmain-content">
        <header className="rgheader">
          <h2>Register Complaint</h2>
          <div className="rgsearch-bar">
            <FaSearch className="rgsearch-icon" />
            <input
              type="text"
              placeholder="Search Item ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <input className="datetype" type="date" />
          <button
            className="rgfilter-btn"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FaFilter /> Filter
          </button>

          <div className="rgheader-icons">
            <FaBell className="rgnotification-icon" />
            <AccountMenu />
          </div>
        </header>

        {filterOpen && (
          <div className="rgfilter-menu">
            <label>
              Status:
              <select>
                <option value="all">All</option>
                <option value="Working">Working</option>
                <option value="Not Working">Not Working</option>
              </select>
            </label>
            <label>
              Product:
              <select>
                <option value="all">All</option>
                <option value="CPU">CPU</option>
                <option value="Monitor">Monitor</option>
              </select>
            </label>
          </div>
        )}

        <table className="rgstock-table">
          <thead>
            <tr>
              <th>Select</th>
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
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8">Error: {error}</td>
              </tr>
            ) : filteredStocks.length === 0 ? (
              <tr>
                <td colSpan="8">No stock details found</td>
              </tr>
            ) : (
              filteredStocks.map((stock) => (
                <tr key={stock.item_no}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleSelectItem(stock)}
                      checked={selectedItems.some(
                        (item) => item.item_no === stock.item_no
                      )}
                    />
                  </td>
                  <td>{stock.item_no}</td>
                  <td>{stock.indent_no}</td>
                  <td>{stock.item_name}</td>
                  <td>{new Date(stock.date_of_invoice).toLocaleDateString()}</td>
                  <td>{stock.description}</td>
                  <td>{stock.price}</td>
                  <td>
                    <span className="rgstatus-label not-working">
                      {stock.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitComplaint}
          style={{ marginTop: "10px" }}
        >
          Register Complaint
        </Button>
      </div>
    </div>
  );
};

export default RegisterComplaint;
