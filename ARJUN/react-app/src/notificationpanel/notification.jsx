import React from "react";
import "./NotificationPanel.css";
import { FaBell, FaCheck, FaTimes } from "react-icons/fa";

const NotificationPanel = () => {
    // Static notifications for UI testing
    const notifications = [
        {
            id: 1,
            message: "User A is requesting access to inventory.",
            type: "stock_request"
        },
        {
            id: 2,
            message: "You updated the inventory.",
            type: "info"
        },
        {
            id: 3,
            message: "User B is forwarding new stock to inventory.",
            type: "stock_transfer"
        },
        {
            id: 4,
            message: "Item warranty is expiring soon.",
            type: "warning"
        }
    ];

    return (
        <div className="notidashboard">
            {/* Sidebar */}
            <div className="notisidebar">
                <div className="notisidebar-item active">
                    <FaBell size={20} />
                    <span>Notifications</span>
                </div>
            </div>

            {/* Notification Panel */}
            <div className="notinotification-panel">
                <h2>Notifications</h2>
                {notifications.length === 0 ? (
                    <p className="empty-message">No new notifications</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification.id} className="notinotification-item">
                            <p>{notification.message}</p>
                            {notification.type === "stock_transfer" && (
                                <div className="notibtn-group">
                                    <button className="notiaccept-btn">
                                        <FaCheck /> Accept
                                    </button>
                                    <button className="notidecline-btn">
                                        <FaTimes /> Decline
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationPanel;