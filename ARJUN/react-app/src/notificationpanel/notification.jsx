import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./NotificationPanel.css";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("❌ No token found. User is not authenticated.");
                    return;
                }

                const decoded = jwtDecode(token);
                const userEmail = decoded.email;

                // ✅ Fetch notifications
                const response = await axios.get("http://localhost:5000/api/fetch-notifications", {
                    params: { receiver: userEmail },
                    headers: { Authorization: `Bearer ${token}` } // ✅ Include token in request
                });

                console.log("🔍 Fetched Notifications:", response.data.data);
                setNotifications(response.data.data);
            } catch (error) {
                console.error("❌ Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    const handleAddacc = async (notifId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No token found. User is not authenticated.");
                return;
            }
            navigate(`/register?notifId=${notifId}`);

            await axios.post(
                "http://localhost:5000/api/Add-account",
                { notifId },
                { headers: { Authorization: `Bearer ${token}` } } // ✅ Include token
            );

            setNotifications(notifications.filter((n) => n._id !== notifId)); // Remove from UI
            console.log(`✅ Notification ${notifId} accepted.`);
        } catch (error) {
            console.error("❌ Error accepting notification:", error);
        }
    };

    const handleview = async (notifId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No token found. User is not authenticated.");
                return;
            }
<<<<<<< HEAD
            navigate(`/reportverify?notifId=${notifId}`);
=======
            
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
            await axios.post(
                "http://localhost:5000/api/report/reportviews",
                { notifId },
                { headers: { Authorization: `Bearer ${token}` } } // ✅ Include token
            );
<<<<<<< HEAD
            
            //navigate(`/reportverify/${notifId}`);
=======
            navigate(`/reportverify?notifId=${notifId}`);
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
            setNotifications(notifications.filter((n) => n._id !== notifId)); // Remove from UI
            
            console.log(`✅ Notification ${notifId} accepted.`);
        } catch (error) {
            console.error("❌ Error accepting notification:", error);
        }
    };


    const handleAccept = async (notifId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No token found. User is not authenticated.");
                return;
            }

            await axios.post(
                "http://localhost:5000/api/accept-notification",
                { notifId },
                { headers: { Authorization: `Bearer ${token}` } } // ✅ Include token
            );

            setNotifications(notifications.filter((n) => n._id !== notifId)); // Remove from UI
            console.log(`✅ Notification ${notifId} accepted.`);
        } catch (error) {
            console.error("❌ Error accepting notification:", error);
        }
    };

    const handleReject = async (notifId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No token found. User is not authenticated.");
                return;
            }

            await axios.post(
                "http://localhost:5000/api/reject-notification",
                { notifId },
                { headers: { Authorization: `Bearer ${token}` } } // ✅ Include token
            );

            setNotifications(notifications.filter((n) => n._id !== notifId)); // Remove from UI
            console.log(`❌ Notification ${notifId} rejected.`);
        } catch (error) {
            console.error("❌ Error rejecting notification:", error);
        }
    };

    return (
        <div className="notidashboard">
            {/* Sidebar */}
            <div className="notisidebar">
                <div className="notisidebar-item active">🔔 Notifications</div>
            </div>

            {/* Notifications Panel */}
            <div className="notinotification-panel">
                <h2>Notifications</h2>
                
                {notifications.length === 0 ? (
                    <p className="empty-message">No new notifications</p>
                ) : (
                    <ul>
                        {notifications.map((notif) => (
                            notif.type === "tskstockforward" ? (
                                <li key={notif._id} className="notinotification-item">
                                    <div>
                                        <strong>TSK FORWARDING STOCK</strong><br />
                                        <strong>Indent No:</strong> {notif.indent_no} <br />
                                        <strong>Sl No:</strong> {notif.sl_no} <br />
                                        <strong>Quantity:</strong> {notif.quantity} <br />
                                    </div>
                                    <div className="notibtn-group">
                                        <button className="notiaccept-btn" onClick={() => handleAccept(notif._id)}>✅ Accept</button>
                                        <button className="notidecline-btn" onClick={() => handleReject(notif._id)}>❌ Reject</button>
                                    </div>
                                </li>
                            ) : null
                        ))}
                        {notifications.map((notif) => (
                            notif.type === "principalfacultyassign" ? (
                                <li key={notif._id} className="notinotification-item">
                                    <div>
                                        <strong>VERIFIER ASSIGNED BY PRINCIPAL</strong><br />
                                        <strong>faculty name:</strong> {notif.facultyname} <br />
                                        <strong>faculty email:</strong> {notif.facultyemail} <br />
                                        <strong>Premise:</strong> {notif.premise} <br />
                                        <strong>Last Date:</strong> {new Date(notif.last_date).toLocaleDateString()} <br />

                                    </div>
                                    <div className="notibtn-group">
                                        <button className="notiaccept-btn" onClick={() => handleAddacc(notif._id)}>✅ Add Account</button>
                                    </div>
                                </li>
                            ) : null
                        ))}


<<<<<<< HEAD
                        {notifications.map((notif,index) => (
                            notif.type === "verifier_report" ? (
                                <li key={ `${notif._id}-${index}`} className="notinotification-item">
=======
                        {notifications.map((notif) => (
                            notif.type === "verifier_report" ? (
                                <li key={notif._id} className="notinotification-item">
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
                                    <div>
                                        <strong>VERIFICATION REPORT BY VERIFIER</strong><br />
                                        <strong>verifier name:</strong> {notif.verifier_name} <br />
                                        <strong>verifier email:</strong> {notif.verifier_email} <br />
                                        <strong>Premise:</strong> {notif.premise} <br />
                                        <strong>Verify Date:</strong> {new Date(notif.verify_date).toLocaleDateString()} <br />

                                    </div>
                                    <div className="notibtn-group">
                                        <button className="notiaccept-btn" onClick={() => handleview(notif._id)}>📄 View Report</button>
                                    </div>
                                </li>
                            ) : null
                        ))}

                    </ul>
                )}
            </div>
        </div>
    );
};

export default Notifications;