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

                const response = await axios.get("http://localhost:5000/api/fetch-notifications", {
                    params: { receiver: userEmail },
                    headers: { Authorization: `Bearer ${token}` }
                });

                let fetchedNotifications = response.data.data;
                console.log("📩 Raw Notifications:", fetchedNotifications);

                // 🔍 Type-Based Filtering
                const validNotifications = fetchedNotifications.filter((notif) => {
                    if (notif.type === "tskstockforward") {
                        return notif.indent_no && notif.sl_no && notif.quantity;
                    } 
                    if (notif.type === "hodstockaccept") {
                        return notif.indent_no && notif.sl_no;
                    } 
                    if (notif.type === "hodstockforward") {
                        return notif.indent_no && notif.quantity && notif.message;
                    }
                    return false; // Exclude all other notification types
                });

                console.log("✅ Filtered Notifications:", validNotifications);
                setNotifications(validNotifications);
            } catch (error) {
                console.error("❌ Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    const handleAction = async (notifId, action) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("❌ No token found. User is not authenticated.");
                return;
            }

            const endpoint = action === "accept"
                ? "http://localhost:5000/api/accept-notification"
                : "http://localhost:5000/api/reject-notification";

            await axios.post(endpoint, { notifId }, { headers: { Authorization: `Bearer ${token}` } });

            setNotifications(notifications.filter((n) => n._id !== notifId));
        } catch (error) {
            console.error(`❌ Error ${action}ing notification:`, error);
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

                <div className="notinotification-list">
                    {notifications.length === 0 ? (
                        <p className="empty-message">No new notifications</p>
                    ) : (
                        <ul>
                            {notifications.map((notif) => (
                                <li key={notif._id} className="notinotification-item">
                                    {notif.type === "tskstockforward" && (
                                        <div>
                                            <strong>TSK FORWARDING STOCK</strong><br />
                                            <strong>Indent No:</strong> {notif.indent_no} <br />
                                            <strong>Sl No:</strong> {notif.sl_no} <br />
                                            <strong>Quantity:</strong> {notif.quantity} <br />
                                            <div className="notibtn-group">
                                                <button className="notiaccept-btn" onClick={() => handleAction(notif._id, "accept")}>✅ Accept</button>
                                                <button className="notidecline-btn" onClick={() => handleAction(notif._id, "reject")}>❌ Reject</button>
                                            </div>
                                        </div>
                                    )}

                                    {notif.type === "hodstockaccept" && (
                                        <div>
                                            <strong>CSE HOD accepted the Stock</strong><br />
                                            <strong>Indent No:</strong> {notif.indent_no} <br />
                                            <strong>Sl No:</strong> {notif.sl_no} <br />
                                        </div>
                                    )}

                                    {notif.type === "hodstockforward" && (
                                        <div>
                                            <strong>HOD FORWARDING STOCK</strong><br />
                                            <strong>Indent No:</strong> {notif.indent_no} <br />
                                            <strong>Quantity:</strong> {notif.quantity} <br />
                                            <strong>Message:</strong> {notif.message} <br />
                                            <div className="notibtn-group">
                                                <button className="notiaccept-btn" onClick={() => handleAction(notif._id, "accept")}>✅ Accept</button>
                                                <button className="notidecline-btn" onClick={() => handleAction(notif._id, "reject")}>❌ Reject</button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
