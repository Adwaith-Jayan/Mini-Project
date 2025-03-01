import React, { useState,useEffect } from 'react';
import './PrincipalDash.css'
import { FaUserCircle, FaSignOutAlt, FaChartBar, FaCheckCircle, FaListAlt, FaBars } from 'react-icons/fa';
import AccountMenu from '../../../../ARJUN/react-app/src/assets/Usermenu';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import VerifiedIcon from '@mui/icons-material/Verified';
import { jwtDecode } from "jwt-decode";
import Sidebarprincipal from '../../../../ARJUN/react-app/src/assets/sidebarforprincipal';

const notifications = [
    { message: 'New report from Verifier' },
    { message: 'New message from HOD' },
];

const PrincipalDash = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userName,setusername]= useState("");
    const [currentdate,setdate]=useState("");
    const [role,setRole]=useState(null);
    
        useEffect(()=>{
            const today = new Date().toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
            setdate(today);
            const token = localStorage.getItem("token");
            if(token){
                try{
                    const decoded = jwtDecode(token);
                    setusername(decoded.name);
                }catch(error){
                    console.error("Error decoding token : ",error);
                }
            }

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
        <div className="app-container">
            <Header userName={userName} currentdate={currentdate}/>
            <div className="main-area">
                <Sidebarprincipal sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role} />
                <Dashboard />
            </div>
        </div>
    );
};

const Header = ({userName,currentdate}) => (
    <header className="header">
        <div className="header-left">
            <span>Welcome, {userName}</span>
            <span>{currentdate}</span>
        </div>
        <div className="header-right">
            <input type="search" placeholder="Search..." />
            <AccountMenu />
        </div>
    </header>
);


const Dashboard = () => (
    <main className="dashboard">
        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <Notifications notifications={notifications} />
        </div>
        <div className="actions">
            <Link to="/assignfaculty"><Button className='action-button' variant="contained">Assign Faculty For Verification</Button></Link>
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
