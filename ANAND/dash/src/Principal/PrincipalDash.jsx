import React, { useState } from 'react';
import './PrincipalDash.css'
import { FaUserCircle, FaSignOutAlt, FaChartBar, FaCheckCircle, FaListAlt, FaBars } from 'react-icons/fa';
import AccountMenu from '../../../../ARJUN/react-app/src/assets/Usermenu';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Home as HomeIcon, Inventory, Update, HealthAndSafety, Send } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import VerifiedIcon from '@mui/icons-material/Verified';

const notifications = [
    { message: 'New report from Verifier' },
    { message: 'New message from HOD' },
];

const PrincipalDash = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const namess = response.data.names;

    return (
        <div className="app-container">
            <Header />
            <div className="main-area">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Dashboard />
            </div>
        </div>
    );
};

const Header = () => (
    <header className="header">
        <div className="header-left">
            <span>Welcome,{namess}</span>
            <span>Thu 16 January 2025</span>
        </div>
        <div className="header-right">
            <input type="search" placeholder="Search..." />
            <AccountMenu />
        </div>
    </header>
);

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <aside className={`clsidebar ${sidebarOpen ? "open" : "closed"}`}>
            <FaBars className="clmenu-icon" onClick={toggleSidebar} />
            {sidebarOpen && (
                <ul>
                    <li><Link to="/Hoddash"><HomeIcon fontSize="medium" /> Dashboard</Link></li>
                    <li><Link to="/stockdetails"><VerifiedIcon fontSize="medium" /> Verification</Link></li>
                    <li><Link to="/stockstatus"><ArticleIcon fontSize="medium" /> Reports </Link></li>
                </ul>
            )}
        </aside>
    );
};

const Dashboard = () => (
    <main className="dashboard">
        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <Notifications notifications={notifications} />
        </div>
        <div className="actions">
            <Link to="/assign"><Button className='action-button' variant="contained">Assign Faculty For Verification</Button></Link>
            <Button className='action-button' variant="contained">Request For Stock Details</Button>
            <Button className='action-button' variant="contained">Reports</Button>
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

const LogoutButton = () => (
    <button className="logout-button">
        <FaSignOutAlt className="logout-icon" />
        Logout
    </button>
);

export default PrincipalDash;
