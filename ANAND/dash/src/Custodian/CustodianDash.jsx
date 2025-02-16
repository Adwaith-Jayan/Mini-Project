import React, { useState,useEffect } from 'react';
import '../Principal/PrincipalDash.css';
import { FaUserCircle, FaSignOutAlt, FaChartBar, FaCheckCircle, FaListAlt, FaBars } from 'react-icons/fa';
import AccountMenu from '../../../../ARJUN/react-app/src/assets/Usermenu';
import Button from '@mui/material/Button';
import Sidebars from '../../../../ARJUN/react-app/src/assets/sidebar';
import {jwtDecode} from "jwt-decode";


const notifications = [
    { message: 'New report from Verifier' },
    { message: 'New message from HOD' },
];

const CustodianDash = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [username,setusername]= useState("");
    const [currentdate,setdate]=useState("");

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
    },[]);

    return (
        <div className="app-container">
            <Header username={username} currentdate={currentdate}/>
            <div className="main-area">
                <Sidebars sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Dashboard />
            </div>
        </div>
    );
};

const Header = ({username,currentdate}) => (
    <header className="header">
        <div className="header-left">
            <span>Welcome, {username}</span>
            <span>{currentdate}</span>
        </div>
        <div className="header-right">
           <span>Premise Name</span>
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
            <Button className='action-button' variant="contained">Add Stock</Button>
            <Button className='action-button' variant="contained">Transfer Log Details</Button>
            <Button className='action-button' variant="contained">Send Email</Button>
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

const LogoutButton = () => (
    <button className="logout-button">
        <FaSignOutAlt className="logout-icon" />
        Logout
    </button>
);

export default CustodianDash;
