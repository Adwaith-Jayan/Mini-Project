import React from 'react';
import './App.css';
import { FaUserCircle, FaSignOutAlt, FaChartBar, FaCheckCircle, FaListAlt } from 'react-icons/fa';
import { FaBeer } from 'react-icons/fa';
import AccountMenu from './assets/usermenu';
import Button from '@mui/material/Button';


const notifications = [
    { message: 'New report from from Verifier' },
    { message: 'New message from HOD' },
];

const App = () => {
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
                <a href="#">Verification</a>
            </li>
            <li className="sidebar-item">
                <FaListAlt className="sidebar-icon" />
                <a href="#">Reports</a>
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
            <Button className='action-button' variant="contained">Assign Faculty for verification</Button>
            <ActionButton label="Request For Stock Details" />
            <ActionButton label="Reports" />
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

export default App;