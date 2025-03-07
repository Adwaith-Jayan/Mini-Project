import express from "express";
import jwt from "jsonwebtoken";
import User from "./usermodel.js";
import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";
const OTP_EXPIRY_TIME = 5 * 60 * 1000;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false  // <-- Add this line
    }
});

// Login Route
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Login Request Received:", email);

    try {
        const user = await User.findOne({ email_id: email });

        if (!user) return res.status(400).json({ message: "User not found" });

        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { email, name: user.name, designation: user.designation },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token,
            designation: user.designation
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Nodemailer Setup


// Send OTP for Password Reset
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    console.log(`🔹 Sending OTP to: ${email}`);

    try {
        const user = await User.findOne({ email_id: email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const otp = Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit OTP
        const expiry = new Date(Date.now() + OTP_EXPIRY_TIME); // Expiry in 5 minutes
        user.otp = otp;
        user.otpExpires = expiry;
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is: ${otp}`
        };

        // Send Email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("❌ Error sending email:", err);
                return res.status(500).json({ message: "Failed to send OTP", error: err.message });
            }
            console.log("✅ Email sent successfully:", info.response);
            res.json({ message: "OTP sent successfully" });
        });

        // await transporter.sendMail(mailOptions);
    } catch (error) {
        res.status(500).json({ message: "Error sending OTP", error });
    }
});

// Verify OTP
router.post("/verify-otp",async (req, res) => {
    const { email, otp } = req.body;
    console.log(`🔹 Verifying OTP for: ${email}`);
    console.log(otp);

    try {
        const user = await User.findOne({ email_id: email });
        if (!user || !user.otp || !user.otpExpires) {
            return res.status(400).json({ message: "OTP not found or expired" });
        }

        if (new Date() > user.otpExpires) {
            user.otp = null;
            user.otpExpires = null;
            await user.save();
            return res.status(400).json({ message: "OTP expired. Please request a new one." });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP verified, clear stored OTP
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "OTP verified successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error });
    }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;
    console.log(`🔹 Resetting password for: ${email}`);

    try {
        const user = await User.findOne({ email_id: email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const Password = newPassword // Hash password
        user.password = Password;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password", error });
    }
});

export default router;
