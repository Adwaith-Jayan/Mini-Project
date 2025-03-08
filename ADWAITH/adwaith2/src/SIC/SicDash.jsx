import React, { useState, useEffect } from 'react';
import './PrincipalDash.css';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import AccountMenu from '../assets/Usermenu';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { Home as HomeIcon, Inventory, Update, HealthAndSafety, Send } from '@mui/icons-material';

const today = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
});

const SicDash = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userName, setUserName] = useState("User");
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    navigate("/login");
                    return;
                }

                const data = await response.json();
                setUserName(data.name);

                // ✅ Fetch Notifications after getting user data
                fetchNotifications(data.email);
            } catch (error) {
                console.error("Error fetching user:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    const fetchNotifications = async (email) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notifications?receiver=${email}`);
            if (!response.ok) throw new Error("Failed to fetch notifications");

            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    return (
        <div className="app-container">
            <Header userName={userName} />
            <div className="main-area">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Dashboard notifications={notifications} />
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
                    <li><Link to="/stockdetails"><Inventory fontSize="medium" /> Stock Details</Link></li>
                    <li><Link to="/stockstatus"><Update fontSize="medium" /> Stock Status Update</Link></li>
                    <li><Link to="/stockwarranty"><HealthAndSafety fontSize="medium" /> Stock Warranty</Link></li>
                    <li><Link to="/stocktransfer"><Send fontSize="medium" /> Stock Transfer</Link></li>
                </ul>
            )}
        </aside>
    );
};

const Dashboard = ({ notifications }) => (
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
            {notifications.length > 0 ? (
                notifications.map((n, i) => (
                    <li key={i}>{n.message}</li>
                ))
            ) : (
                <li>No new notifications</li>
            )}
        </ul>
        <Link to="/notify">View All</Link>
    </div>
);

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            Logout
        </button>
    );
};

export default SicDash;
