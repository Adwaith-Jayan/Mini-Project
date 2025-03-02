import express from "express";
import TskNotification from "./tskforwardnotification.js";
import HodAcceptNotification from "./HodAcceptNotification.js";
import MainStock from "./mainstockmodel.js";

const router = express.Router();

// ✅ Log Receiver Email API
router.get("/api/log-receiver", (req, res) => {
    const { receiver } = req.query;
    if (!receiver) {
        return res.status(400).json({ error: "Receiver email is required" });
    }
    console.log("📩 Receiver Email:", receiver);
    res.json({ message: "Receiver email logged successfully", receiver });
});

// ✅ Fetch & Process Notifications API
router.get("/api/fetch-notifications", async (req, res) => {
    const { receiver } = req.query;
    if (!receiver) {
        return res.status(400).json({ error: "Receiver email is required" });
    }

    try {
        // 🔍 Fetch unread TskForwardNotifications
        const tskNotifications = await TskNotification.find({ receiver, status: "unread" });
        
        // 🔍 Fetch unread HodAcceptNotifications
        const hodNotifications = await HodAcceptNotification.find({ receiver, status: "unread" });

        // 🔄 Process TskForwardNotifications
        const detailedTskNotifications = await Promise.all(
            tskNotifications.map(async (notification) => {
                if (notification.type === "tskstockforward") {
                    const { indent_no, sl_no } = notification;
                    const stock = await MainStock.findOne({ indent_no, sl_no });
                    return {
                        _id: notification._id,
                        type: notification.type,
                        indent_no,
                        sl_no,
                        quantity: stock ? stock.quantity : "Not Found",
                        status: notification.status,
                        createdAt: notification.date,
                    };
                }
                return {
                    _id: notification._id,
                    type: notification.type,
                    status: notification.status,
                    createdAt: notification.date,
                };
            })
        );

        // 🔄 Process HodAcceptNotifications
        const detailedHodNotifications = hodNotifications.map((notification) => ({
            _id: notification._id,
            type: notification.type,  // ✅ "hodstockaccept"
            indent_no: notification.indent_no,
            sl_no: notification.sl_no,
            status: notification.status,
            createdAt: notification.date,
        }));

        // ✅ Merge both notifications
        const allNotifications = [...detailedTskNotifications, ...detailedHodNotifications];

        // ✅ Send processed notifications to frontend
        res.json({ data: allNotifications });
    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
