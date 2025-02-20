import React, { useState,useEffect } from 'react';
import '../Principal/PrincipalDash.css';
import { FaUserCircle, FaSignOutAlt, FaChartBar, FaCheckCircle, FaListAlt, FaBars } from 'react-icons/fa';
import AccountMenu from '../../../../ARJUN/react-app/src/assets/Usermenu';
import Button from '@mui/material/Button';
import {jwtDecode} from "jwt-decode";
import Sidebars from '../../../../ARJUN/react-app/src/assets/sidebar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const notifications = [
    { message: 'New report from Verifier' },
    { message: 'New message from HOD' },
];

const handleLogout = (navigate) => {
    localStorage.removeItem("token"); // Remove the token from storage
    navigate("/", {replace: true}); // Redirect to login page
    window.location.reload(); // Ensure the page reloads completely
    window.history.pushState(null,null,"/");
  };

const SicDash = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [username,setusername]= useState("");
    const [currentdate,setdate]=useState("");
    const [role,setRole]=useState(null);
    const navigate= useNavigate();
    
    
    useEffect(()=>{
              const token = localStorage.getItem("token"); // Retrieve token from localStorage
              if (token) {
                try {
                  const decoded = jwtDecode(token); // Decode token to get user info
                  setRole(decoded.designation);
                } catch (error) {
                  console.error("Invalid Token:", error);
                }
              }
            const today = new Date().toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
            setdate(today);
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
                <Sidebars sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={role}/>
                <Dashboard navigate={navigate} />
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



const Dashboard = ({navigate}) => (
    <main className="dashboard">
        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <Notifications notifications={notifications} />
        </div>
        <div className="actions">
                <Link to = "/addstocksic"><Button className='action-button' variant="contained">Add Stock</Button></Link>
                <Link to = "/stockclears"><Button className='action-button' variant="contained">Stock Clearance</Button></Link>
                <Button className='action-button' variant="contained">Send Email</Button>
                <Button className='action-button' variant="contained">Transfer Log Details</Button>
                <Button className='action-button' variant="contained">Stock Handover</Button>

        </div>
        <LogoutButton navigate={navigate} />
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
        <Link to="/notify">View All</Link>
    </div>
);

const LogoutButton = ({navigate}) => {
    
    return (
    <button className="logout-button">
        <FaSignOutAlt className="logout-icon" onClick={()=>{handleLogout(navigate)}}/>
        Logout
    </button>
    );
};

export default SicDash;
