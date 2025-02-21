import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define the schema for the "main" collection
const stockSchema = new mongoose.Schema({
    sl_no: { type: String, required: true },
    indent_no: { type: String, required: true },
    date_of_purchase: { type: Date, required: true },
    price: { type: Number, required: true },
    department: { type: String, default: "" }  // Default to empty string
});

// Create a model for the "main" collection
const MainStock = mongoose.model('Main', stockSchema,'main');

// Route to fetch all stock details
router.get("/mainstock", async (req, res) => {
    try {
        const stocks = await MainStock.find();
        res.status(200).json(stocks);
    } catch (error) {
        console.error("Error fetching stock details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;
