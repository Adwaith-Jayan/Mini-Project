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
                if (!token) return;

                const decoded = jwtDecode(token);
                const userEmail = decoded.email;

                // 1️⃣ Log receiver email (for debugging)
                await axios.get("http://localhost:5000/api/log-receiver", {
                    params: { receiver: userEmail }
                });

                console.log("✅ Receiver email logged successfully:", userEmail);

                // 2️⃣ Fetch detailed notifications
                const response = await axios.get("http://localhost:5000/api/fetch-notifications", {
                    params: { receiver: userEmail }
                });

                console.log("🔍 Detailed Notifications:", response.data.data);
                setNotifications(response.data.data);
            } catch (error) {
                console.error("❌ Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    const handleAccept = async (notifId) => {
        try {
            await axios.post("http://localhost:5000/api/accept-notification", { notifId });
            setNotifications(notifications.filter((n) => n._id !== notifId)); // Remove from UI
        } catch (error) {
            console.error("❌ Error accepting notification:", error);
        }
    };

    const handleReject = async (notifId) => {
        try {
            await axios.post("http://localhost:5000/api/reject-notification", { notifId });
            setNotifications(notifications.filter((n) => n._id !== notifId)); // Remove from UI
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
