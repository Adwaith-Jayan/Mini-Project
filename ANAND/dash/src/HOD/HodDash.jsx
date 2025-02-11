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

const HodDash = () => {
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
          <input type="search" placeholder="Search..." />
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
                <a href="#">Stock Details</a>
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
                <Button className='action-button' variant="contained">Create Account</Button>
                <Button className='action-button' variant="contained">Remove Account</Button>
                <Button className='action-button' variant="contained">Send Email</Button>
                <Button className='action-button' variant="contained">Create New Stock System</Button>
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

export default HodDash;