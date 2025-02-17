import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"; // Use .env for security

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://adwaithjayan:abcd1234@cluster0.u0feo.mongodb.net/DepartmentStockManagement?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); 
    }
};

connectDB();

const userSchema = new mongoose.Schema({
    name: String,
    email_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    otp: String,
    otpExpires: Date
});

const User = mongoose.model('User', userSchema, 'user');

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Login Request Received:", email);

    try {
        const user = await User.findOne({ email_id: email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (password !== user.password) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ email, name: user.name, designation: user.designation }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ 
            message: "Login successful", 
            token, 
            name: user.name,
            designation: user.designation  
        });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Route to Get User Data
app.get("/user", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ email_id: decoded.email });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ name: user.name, email: user.email_id, designation: user.designation });
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
});

// Stock Data Fetching Logic
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
    ident_no: String
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
app.get("/stockdetails", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const email = decoded.email;
        
        // Get the room_no for the user
        const accessData = await Access.findOne({ email_id: email });
        if (!accessData) return res.status(404).json({ message: "No access data found" });
        
        const room_no = accessData.room_no;
        
        // Find all item_no that belong to the room
        const itemsInRoom = await BelongsTo.find({ room_no }).select("item_no");
        const itemNumbers = itemsInRoom.map(item => item.item_no);
        
        // Find ident_no for each item_no
        const identNumbers = await Includes.find({ item_no: { $in: itemNumbers } });
        
        // Extract ident_no list
        const identNoList = identNumbers.map(i => i.ident_no);
        
        // Fetch stock details using indent_no (ident_no maps to indent_no in stock)
        const stockDetails = await Stock.find({ indent_no: { $in: identNoList } });

        // Fetch item details to get the status
        const itemDetails = await Item.find({ item_no: { $in: itemNumbers } });

        // Map the stock details properly
        const stockInfo = stockDetails.map(stock => {
            const identEntry = identNumbers.find(i => i.ident_no === stock.indent_no);
            const itemEntry = itemDetails.find(i => i.item_no === (identEntry ? identEntry.item_no : null));

            return {
                item_no: identEntry ? identEntry.item_no : "N/A",
                ident_no: stock.indent_no || "N/A", // This was previously showing "N/A" incorrectly
                item_name: stock.name,
                date_of_invoice: stock.date_of_purchase,
                description: stock.specification,
                price: stock.price,
                status: itemEntry ? itemEntry.status : "Unknown" // Now correctly linked
            };
        });

        res.json(stockInfo);
    } catch (error) {
        console.error("❌ Error fetching stock details:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
