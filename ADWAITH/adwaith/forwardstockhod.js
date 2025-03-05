import express from "express";
import mongoose from "mongoose";
import CseMain from "./csemainmodel.js";
import Room from "./Roommodel.js";
import Access from "./accessmodel.js";
import User from "./models.js";
import HODForwardNotification from "./HodForwardNotification.js";

const router = express.Router();

// ✅ Fetch stock items with remaining quantity > 0
router.get("/api/fetch-stock", async (req, res) => {
    try {
        const stockItems = await CseMain.find({ remaining: { $gt: 0 } });
        res.json(stockItems);
    } catch (error) {
        console.error("Error fetching stock:", error);
        res.status(500).json({ message: "Failed to fetch stock items" });
    }
});

// ✅ Fetch available premises (room names)
router.get("/api/fetch-premises", async (req, res) => {
    try {
        const rooms = await Room.find({}, "name"); // Fetch only the 'name' field
        res.json(rooms);
    } catch (error) {
        console.error("Error fetching premises:", error);
        res.status(500).json({ message: "Failed to fetch premises" });
    }
});

// ✅ Forward stock and update remaining quantity
router.post("/api/forward-stock-hod", async (req, res) => {
    try {
        const { sl_no, indent_no, item_name, quantity, price, date_of_purchase, premise } = req.body;

        // ✅ Validate input fields
        if (!sl_no || !indent_no || !item_name || !quantity || !price || !date_of_purchase || !premise) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Ensure valid number inputs
        const parsedSLNo = parseInt(sl_no, 10);
        const parsedQuantity = parseInt(quantity, 10);
        const parsedPrice = parseFloat(price);

        if (isNaN(parsedSLNo) || isNaN(parsedQuantity) || isNaN(parsedPrice)) {
            return res.status(400).json({ message: "Invalid input format for SL No, Quantity, or Price" });
        }

        // ✅ Find the stock item
        const stockItem = await CseMain.findOne({ sl_no: parsedSLNo });
        if (!stockItem) {
            return res.status(404).json({ message: "Stock item not found" });
        }

        // ✅ Check if enough quantity is available
        if (stockItem.remaining < parsedQuantity) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }

        // ✅ Update the remaining quantity
        stockItem.remaining -= parsedQuantity;
        await stockItem.save();

        // ✅ Fetch room details
        const room = await Room.findOne({ name: premise });
        if (!room) {
            return res.status(404).json({ message: "Premise (room) not found" });
        }

        // ✅ Fetch access details for the room
        const access = await Access.findOne({ room_no: room.room_no });
        if (!access) {
            return res.status(404).json({ message: "No access record found for this room." });
        }

        // ✅ Fetch Stock-In-Charge email
        const stockInChargeUser = await User.findOne({ email_id: access.email_id, designation: "Stock-In-Charge" });
        if (!stockInChargeUser) {
            return res.status(404).json({ message: "No Stock-In-Charge found for this room." });
        }

        // ✅ Create a new notification entry with status "unread"
        const notification = new HODForwardNotification({
            type: "hodstockforward",
            indent_no,
            item_name,
            quantity: parsedQuantity,
            price: parsedPrice,
            date_of_purchase: new Date(date_of_purchase),
            sender: "arjunsabuakatsuki@gmail.com", // Replace with actual HOD email ID
            receiver: stockInChargeUser.email_id, // Only one receiver
            date: new Date(),
            status: "unread" // ✅ Status is now set as "unread"
        });

        await notification.save();

        res.status(200).json({ message: "Stock forwarded successfully!" });
    } catch (error) {
        console.error("Error forwarding stock:", error);
        res.status(500).json({ message: "Failed to forward stock", error: error.message });
    }
});

export default router;
