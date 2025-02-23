import express from "express";
import mongoose from "mongoose";
import { jwtDecode } from "jwt-decode";
import MainStock from "./mainstockmodel.js";
import TskForwardNotification from "./tskforwardnotification.js"; // ✅ Imported Correct Model

const router = express.Router();

// ✅ API Route for Normal Notifications (Dashboard)
router.get("/api/notifications", async (req, res) => {
    try {
        const { receiver, status } = req.query;

        if (!receiver) {
            return res.status(400).json({ error: "Receiver email is required" });
        }

        const query = { receiver };
        if (status) query.status = status;

        const notifications = await TskForwardNotification.find(query).sort({ date: -1 });

        const formattedNotifications = notifications.map(notification => {
            let message;
            switch (notification.type) {
                case "tskstockforward":
                    message = "New message from TSK";
                    break;
                case "verifier_report":
                    message = "New verification report submitted";
                    break;
                case "hod_message":
                    message = "New message from HOD";
                    break;
                default:
                    message = "New notification received";
                    break;
            }
            return {
                _id: notification._id,
                receiver: notification.receiver,
                message,
                type: notification.type,
                status: notification.status,
                createdAt: notification.date
            };
        });

        res.json(formattedNotifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// // ✅ API Route for Detailed Notifications (Stock Page)
// router.get("/api/detailed-notifications", async (req, res) => {
//     try {
//         const { receiver } = req.query;

//         if (!receiver) {
//             return res.status(400).json({ error: "Receiver email is required" });
//         }

//         const notifications = await TskForwardNotification.find({ receiver }).sort({ date: -1 });

//         const detailedNotifications = await Promise.all(
//             notifications.map(async (notification) => {
//                 if (notification.type === "tskstockforward") {
//                     const stock = await MainStock.findOne({
//                         indent_no: notification.indent_no,
//                         sl_no: notification.sl_no
//                     });

//                     console.log("🔍 Stock Found:", stock); // Debugging log

//                     return {
//                         _id: notification._id,
//                         sender: notification.sender,
//                         indent_no: notification.indent_no,
//                         quantity: stock ? stock.quantity : "Not Found",
//                         status: notification.status,
//                         createdAt: notification.date
//                     };
//                 }
//                 return {
//                     _id: notification._id,
//                     sender: notification.sender,
//                     indent_no: notification.indent_no || "N/A",
//                     status: notification.status,
//                     createdAt: notification.date
//                 };
//             })
//         );

//         res.json(detailedNotifications);
//     } catch (error) {
//         console.error("Error fetching detailed notifications:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// ✅ Custom Hook for React to Fetch Notifications
// const useNotifications = () => {
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) return;

//                 const decoded = jwtDecode(token);
//                 const userEmail = decoded.email;

//                 const response = await axios.get(`http://localhost:5000/api/notifications?receiver=${userEmail}&status=unread`);
//                 setNotifications(response.data);
//             } catch (error) {
//                 console.error("Error fetching notifications:", error);
//             }
//         };

//         fetchNotifications();
//     }, []);

//     return notifications;
// };

// // ✅ Export both the Express route and the custom React Hook
// export { useNotifications };
export default router;
