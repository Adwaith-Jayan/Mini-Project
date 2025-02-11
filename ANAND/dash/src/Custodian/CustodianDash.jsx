import React from 'react';
import '../Principal/PrincipalDash.css';
import { FaUserCircle, FaSignOutAlt, FaChartBar, FaCheckCircle, FaListAlt } from 'react-icons/fa';
import { FaBeer } from 'react-icons/fa';
import AccountMenu from '../assets/usermenu';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


const notifications = [
    { message: 'New report from from Verifier' },
    { message: 'New message from HOD' },
];

const CustodianDash = () => {
    return (
        <div className="app-container">
            <Header />
            <div className="main-area">
                <Sidebar />
                <Dashboard />
            </div>
        </div>
    );
};

const Header = () => (
  <header className="header">
      <div className="header-left">
          <span>Welcome, User</span>
          <span>Thu 16 January 2025</span>
      </div>
     
      <div className="header-right">
          <span>Premise Name</span>
          
          <AccountMenu/>
      </div>
  </header>
);


const Sidebar = () => (
    <aside className="sidebar">
        <div className="dashboard-label">Menu</div>
        <ul className="sidebar-nav">
            <li className="sidebar-item">
                <FaChartBar className="sidebar-icon" />
                <a href="#">Dashboard</a>
            </li>
           
            <li className="sidebar-item">
                <FaCheckCircle className="sidebar-icon" />
                <a href="#">Stock Details</a> {/* Changed to <a> tag with href */}
            </li>
            <li className="sidebar-item">
                <FaListAlt className="sidebar-icon" />
                <a href="#">Stock Status Update</a> {/* Changed to <a> tag with href */}
            </li>
            <li className="sidebar-item">
                <FaListAlt className="sidebar-icon" />
                <a href="#">Stock Warranty</a> {/* Changed to <a> tag with href */}
            </li>
            <li className="sidebar-item">
                <FaListAlt className="sidebar-icon" />
                <a href="#">Stock Transfer</a> {/* Changed to <a> tag with href */}
            </li>
            
        </ul>
    </aside>
);

const Dashboard = () => (
    <main className="dashboard">
        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <Notifications notifications={notifications} />
        </div>
        <div className="actions">
                <Button className='action-button' variant="contained">Add Stock</Button>
                <Button className='action-button' variant="contained">Send Email</Button>
                <Button className='action-button' variant="contained">Transfer Log Details</Button>
                <Button className='action-button' variant="contained">Stock Handover</Button>
        </div>
        <LogoutButton />
    </main>
);

const Notifications = ({ notifications }) => (
    <div className="notifications">
        <div className="notification-header">
            <h2>Notifications</h2>
        </div>
        <ul>
            {notifications.map((n, i) => (
                <li key={i}>{n.message}</li>
            ))}
        </ul>
        <a href="#">View All</a>
    </div>
);

const ActionButton = ({ label }) => (
    <button className="action-button">{label}</button>
);

const LogoutButton = () => (
    <button className="logout-button">
        <FaSignOutAlt className="logout-icon" />
        Logout
    </button>
);

export default CustodianDash;