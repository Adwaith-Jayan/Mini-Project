import express from "express";
import mongoose from "mongoose";
import CseMain from "./csemainmodel.js";
import Room from "./Roommodel.js";

const router = express.Router();

// Fetch stock items with remaining > 0
router.get("/fetch-stock", async (req, res) => {
    try {
        const stockItems = await CseMain.find({ remaining: { $gt: 0 } });
        res.json(stockItems);
    } catch (error) {
        console.error("Error fetching stock:", error);
        res.status(500).json({ message: "Failed to fetch stock items" });
    }
});

// Fetch available premises (room names)
router.get("/fetch-premises", async (req, res) => {
    try {
        const rooms = await Room.find({}, "name"); // Fetch only the 'name' field
        res.json(rooms);
    } catch (error) {
        console.error("Error fetching premises:", error);
        res.status(500).json({ message: "Failed to fetch premises" });
    }
});

// Forward stock and update remaining quantity
router.post("/forward-stock-hod", async (req, res) => {
    try {
        const { sl_no, indent_no, item_name, quantity, price, date_of_purchase, premise } = req.body;

        // Validate input
        if (!sl_no || !indent_no || !item_name || !quantity || !price || !date_of_purchase || !premise) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure valid number inputs
        const parsedSLNo = parseInt(sl_no, 10);
        const parsedQuantity = parseInt(quantity, 10);
        const parsedPrice = parseFloat(price);

        if (isNaN(parsedSLNo) || isNaN(parsedQuantity) || isNaN(parsedPrice)) {
            return res.status(400).json({ message: "Invalid input format for SL No, Quantity, or Price" });
        }

        // Find the stock item
        const stockItem = await CseMain.findOne({ sl_no: parsedSLNo });
        if (!stockItem) {
            return res.status(404).json({ message: "Stock item not found" });
        }

        // Check if enough quantity is available
        if (stockItem.remaining < parsedQuantity) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }

        // Update the remaining quantity
        stockItem.remaining -= parsedQuantity;
        await stockItem.save();

        res.status(200).json({ message: "Stock forwarded successfully!" });
    } catch (error) {
        console.error("Error forwarding stock:", error);
        res.status(500).json({ message: "Failed to forward stock" });
    }
});

export default router;
