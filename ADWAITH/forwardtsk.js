import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define schema for stock forwarding
const stockSchema = new mongoose.Schema({
    sl_no: { type: String, required: true },
    indent_no: { type: String, required: true },
    date_of_purchase: { type: String, required: true },
    price: { type: Number, required: true },
    department: { type: String, default: "" } // Initially empty
});

// Create a model for the "main" collection
const Stock = mongoose.model('main', stockSchema,'main');

// API endpoint to forward stock
router.post('/api/forward-stock-tsk', async (req, res) => {
    try {
        const { sl_no, indent_no, date_of_purchase, price, department } = req.body;

        // Validate input
        if (!sl_no || !indent_no || !date_of_purchase || !price) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Create new stock entry
        const newStock = new Stock({
            sl_no,
            indent_no,
            date_of_purchase,
            price,
            department: "" // Ensure department is empty if not provided
        });

        // Save to MongoDB
        await newStock.save();

        res.status(201).json({ message: "Stock forwarded successfully!", data: newStock });
    } catch (error) {
        console.error("Error forwarding stock:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
