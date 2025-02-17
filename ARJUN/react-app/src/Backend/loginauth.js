import express from "express";
import jwt from "jsonwebtoken";
import User from "./usermodel.js";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Login Request Received:", email);

    try {
        const user = await User.findOne({ email_id: email });

        if (!user) return res.status(400).json({ message: "User not found" });

        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ email, name: user.name, designation: user.designation }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ 
            message: "Login successful", 
            token: token, 
            designation: user.designation  
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;
