import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./NotificationPanel.css";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

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
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Notifications;
