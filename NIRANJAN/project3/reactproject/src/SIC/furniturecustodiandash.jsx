import React, { useState, useEffect } from 'react';
import './PrincipalDash.css';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import AccountMenu from '../assets/Usermenu';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { Home as HomeIcon, Inventory, Update, HealthAndSafety, Send } from '@mui/icons-material';

const notifications = [
    { message: 'New report from Verifier' },
    { message: 'New message from HOD' },
];

const today = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
});

const FcDash = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userName, setUserName] = useState("User");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            // try {
            //     const response = await fetch("http://localhost:5000/user", {
            //         method: "GET",
            //         headers: {
            //             "Authorization": `Bearer ${token}`,
            //             "Content-Type": "application/json",
            //         },
            //     });

            //     if (!response.ok) {
            //         navigate("/login");
            //         return;
            //     }

            //     const data = await response.json();
            //     setUserName(data.name);
            // } catch (error) {
            //     console.error("Error fetching user:", error);
            //     navigate("/login");
            // }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="app-container">
            <Header userName={userName} />
            <div className="main-area">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Dashboard />
            </div>
        </div>
    );
};

const Header = ({ userName }) => (
    <header className="header">
        <div className="header-left">
            <span>Welcome, {userName}</span>
            <span>{today}</span>
        </div>
        <div className="header-right">
            <span>Premise Name</span>
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
                    <li><Link to="/fsdetails"><Inventory fontSize="medium" /> Stock Details</Link></li>
                    <li><Link to="/stockstatus"><Update fontSize="medium" /> Stock Status Update</Link></li>
                    <li><Link to="/stockwarranty"><HealthAndSafety fontSize="medium" /> Stock Warranty</Link></li>
                    <li><Link to="/stocktransfer"><Send fontSize="medium" /> Stock Transfer</Link></li>
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
            <Button className='action-button' variant="contained">Add Stock</Button>
            <Link to="/stockclears"><Button className='action-button' variant="contained">Stock Clearance</Button></Link>
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

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            Logout
        </button>
    );
};

export default FcDash;
