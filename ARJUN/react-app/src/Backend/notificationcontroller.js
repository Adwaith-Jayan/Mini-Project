import express from "express";
import AssignfacultyNotification from "./Assignfacultyschema.js";
import TskNotification from "../../../../ADWAITH/tskforwardnotification.js"; 

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
        // 🔍 Fetch unread notifications for the receiver
        // const notifications = await TskNotification.find({ receiver, status: "unread" });
        const assignnotification= await AssignfacultyNotification.find({receiver,status: "unread"});

        if (!assignnotification.length) {
            return res.json({ message: "No unread notifications", data: [] });
        }

        // 🔄 Process each notification
        // const detailedNotifications = await Promise.all(
        //     notifications.map(async (notification) => {
        //         if (notification.type === "tskstockforward") {
        //             // 🔍 Fetch indent_no & sl_no
        //             const { indent_no, sl_no } = notification;

        //             // 🔍 Fetch quantity from MainStock
        //             const stock = await MainStock.findOne({ indent_no, sl_no });

        //             return {
        //                 _id: notification._id,
        //                 type: notification.type, // ✅ Send Type
        //                 indent_no,
        //                 sl_no,
        //                 quantity: stock ? stock.quantity : "Not Found",
        //                 status: notification.status,
        //                 createdAt: notification.date,
        //             };
        //         }

        //         // Return other notifications as they are where type is not stock forward
        //         return {
        //             _id: notification._id,
        //             type: notification.type, // ✅ Send Type
        //             status: notification.status,
        //             createdAt: notification.date,
        //         };
        //     })
        // );
        const assignNotifications = await Promise.all(
            assignnotification.map(async (asnotification) => {
                if (asnotification.type === "principalfacultyassign") {
                    // 🔍 Fetch indent_no & sl_no
                    const { facultyname, facultyemail,premise,last_date } = asnotification;


                    return {
                        _id: asnotification._id,
                        type: asnotification.type, // ✅ Send Type
                        facultyname,
                        facultyemail,
                        premise,
                        last_date,
                        status: asnotification.status,
                        createdAt: asnotification.date
                    };
                }

                // Return other notifications as they are where type is not stock forward
                return {
                    _id: asnotification._id,
                    type: asnotification.type, // ✅ Send Type
                    status: asnotification.status,
                    createdAt: asnotification.date,
                };
            })
        );

        // ✅ Send processed notifications to frontend
        // res.json({ data: detailedNotifications });
        res.json({data: assignNotifications});

    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
