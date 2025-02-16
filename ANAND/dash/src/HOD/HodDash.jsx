import React, { useState, useEffect } from 'react';
import '../Principal/PrincipalDash.css';
import { FaUserCircle, FaSignOutAlt, FaChartBar, FaCheckCircle, FaListAlt, FaBars } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountMenu from '../../../../ARJUN/react-app/src/assets/Usermenu';
import { jwtDecode } from "jwt-decode";

const notifications = [
    { message: 'New report from Verifier' },
    { message: 'New message from HOD' },
];

const HodDash = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserName(decoded.name); 
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);


    return (
        <div className="app-container">
             <Header userName={userName}/>
            <div className="main-area">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Dashboard />
            </div>
        </div>
    );
};

const Header = ({userName}) => (
    <header className="header">
        <div className="header-left">
            <span>Welcome, {userName}</span>
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
            <Link to="/register">
            <Button className='action-button' variant="contained">Create Account</Button>
            </Link>
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

const LogoutButton = () => (
    <button className="logout-button">
        <FaSignOutAlt className="logout-icon" />
        Logout
    </button>
);

export default HodDash;
