import express from "express";
import jwt from "jsonwebtoken";
import User from "./models.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"; // Use .env for security

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Login Request Received:", email);

    try {
        const user = await User.findOne({ email_id: email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (password !== user.password) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ email,email_id: user.email_id, name: user.name, designation: user.designation }, SECRET_KEY, { expiresIn: "1h" });

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

// Get User Details Route
router.get("/user", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ email_id: decoded.email });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ name: user.name, email: user.email_id, designation: user.designation });
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(403).json({ message: "Invalid token" });
    }
});

export default router;
