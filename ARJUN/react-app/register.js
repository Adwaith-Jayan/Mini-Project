import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const SECRET_KEY = "your_jwt_secret";

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// User Schema
const UserSchema = new mongoose.Schema({
  firstName: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  inventory: String,
});

const User = mongoose.model("User", UserSchema,'user');

// 🟢 Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, email, password, role, inventory } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email_id: email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ firstName, email, password: password, role, inventory });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// 🟢 Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

     if (password !== user.password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ email, designation: user.designation }, SECRET_KEY, { expiresIn: "1h" });
    
        res.json({ 
            message: "Login successful", 
            token: token, 
            designation: user.designation  // Ensure this is sent
        });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
