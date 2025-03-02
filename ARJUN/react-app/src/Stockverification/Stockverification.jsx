import React, { useState,useEffect } from "react";
import "./stockverify.css";
import { FaSearch, FaUser, FaBars, FaBell, FaFilter } from "react-icons/fa";
import AccountMenu from "../assets/Usermenu";
import BasicButtons from "../assets/Buttons";
import Button  from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import Sidebarverifier from "../assets/sidebarverifier";
import { jwtDecode } from "jwt-decode";

const Stockverifications = () => {
  const [stocks, setStocks] = useState([
    { id: "#7876", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen",Remarks:"", status: "" },
    { id: "#7877", invoice: "30/06/2024", indent: "01/07/2024", name: "CPU", description: "Intel i5 12th gen",Remarks:"", status: "" },
    { id: "#7878", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL",Remarks:"", status: "" },
    { id: "#7879", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL",Remarks:"", status: "" },
    { id: "#7880", invoice: "28/06/2024", indent: "30/06/2024", name: "Monitor", description: "Monitor DELL",Remarks:"", status: "" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [role,setRole]=useState(null);

  const toggleFilterMenu = () => setFilterOpen(!filterOpen);

  const handleStatusChange = (index, newStatus) => {
    const updatedStocks = [...stocks];
    updatedStocks[index].status = newStatus;
    setStocks(updatedStocks);
  };

  useEffect(() => {
          const token = localStorage.getItem("token"); // Retrieve token from localStorage
                        if (token) {
                          try {
                            const decoded = jwtDecode(token); // Decode token to get user info
                            setRole(decoded.designation);
                          } catch (error) {
                            console.error("Invalid Token:", error);
                          }
                        }
            },[]);

  return (
    <div className="stockverificationcontainer">
      {/* Sidebar */}
      <Sidebarverifier sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role}/>
      {/* Main Content */}
      <div className="vfmain-content">
        <header className="headerstockverificaton">
          <h2>Stock Verification</h2>
          <div className="vfsearch-bar">
            <FaSearch className="vfsearch-icon" />
            <input type="text" placeholder="Search Item ID" />
            <input type="date" />
            <button className="vffilter-btn" onClick={toggleFilterMenu}>
              <FaFilter /> Filter
            </button>
          </div>
          <div className="verifybtn">
          <Button variant="contained"endIcon={<SendIcon />}>Submit</Button>
        </div>

          <div className="vfheader-icons">
            <FaBell className="vfnotification-icon" />
            <div className="vfuser-menu">
              <AccountMenu/>
            </div>
          </div>
        </header>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="vffilter-menu">
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
        <table className="vfstock-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Date of Invoice</th>
              <th>Date of Indent</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Remarks</th>
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
                <td>
                    <input className="remarkinput"
                        type="text"
                        value={stock.Remarks} 
                        onChange={(e) => {
                        const updatedStocks = [...stocks];
                        updatedStocks[index].Remarks = e.target.value;
                        setStocks(updatedStocks);
                        }}
                    />
                </td>

                <td>
                  <select
                    className={`vfstatus-dropdown ${
                        stock.status === "" ? "" : stock.status === "Working" ? "vfworking" : "vfnot-working"
                      }`}
                    value={stock.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    
                  >
                    <option value="">Select Status</option>
                    <option value="Working">Working</option>
                    <option value="Not Working">Not Working</option>
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

export default Stockverifications;
