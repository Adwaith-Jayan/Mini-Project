import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

// Schema Definitions
const accessSchema = new mongoose.Schema({
    email_id: String,
    room_no: Number
});
const Access = mongoose.model("Access", accessSchema, "access");

const belongsToSchema = new mongoose.Schema({
    item_no: String,
    room_no: Number
});
const BelongsTo = mongoose.model("BelongsTo", belongsToSchema, "belongs_to");

const itemSchema = new mongoose.Schema({
    item_no: String,
    status: String,
    type: String
});
const Item = mongoose.model("Item", itemSchema, "item");

const includesSchema = new mongoose.Schema({
    item_no: String,
    indent_no: String,
    sl_no: Number
});
const Includes = mongoose.model("Includes", includesSchema, "includes");

const stockSchema = new mongoose.Schema({
    name: String,
    indent_no: String,
    sl_no: Number,
    qty: Number,
    date_of_purchase: Date,
    specification: String,
    warranty_period: String,
    price: Number
});
const Stock = mongoose.model("Stock", stockSchema, "stock");

// Route to Fetch Stock Details
router.get("/stockdetails", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const email = decoded.email;
        
        // Fetch all rooms the user has access to
        const accessData = await Access.find({ email_id: email });
        if (!accessData.length) return res.status(404).json({ message: "No access data found" });

        const roomNumbers = accessData.map(access => access.room_no);

        // Find all item_no that belong to the rooms
        const itemsInRoom = await BelongsTo.find({ room_no: { $in: roomNumbers } }).select("item_no");
        const itemNumbers = itemsInRoom.map(item => item.item_no);

        if (!itemNumbers.length) return res.json([]); // No items found

        // Find ident_no and sl_no for each item_no
        const identNumbers = await Includes.find({ item_no: { $in: itemNumbers } });
        const stockDetails = await Promise.all(
            identNumbers.map(async (ident) => {
                const stock = await Stock.findOne({ indent_no: ident.indent_no, sl_no: ident.sl_no });
                return stock ? {
                    item_no: ident.item_no,
                    indent_no: stock.indent_no,
                    item_name: stock.name,
                    date_of_invoice: stock.date_of_purchase,
                    description: stock.specification,
                    price: stock.price,
                    status: (await Item.findOne({ item_no: ident.item_no }))?.status || "Unknown"
                } : null;
            })
        );

        res.json(stockDetails.filter(stock => stock !== null));
    } catch (error) {
        console.error("❌ Error fetching stock details:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
