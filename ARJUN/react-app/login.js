import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "your_jwt_secret"; // Fetch from env file

// MongoDB connection URI from environment variable
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://adwaithjayan:abcd1234@cluster0.u0feo.mongodb.net/DepartmentStockManagement?retryWrites=true&w=majority'; 

// Async function to connect to MongoDB
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

// Call the function to connect to MongoDB
connectDB();

// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    email_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    otp: String,
    otpExpires: Date
    
});


const User = mongoose.model('User', userSchema,'user');

// Login Route - Check email and password, send OTP
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Login Request Received:", email, password);

    const user = await User.findOne({ email_id: email });
    console.log(user);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password using bcrypt
    if (password !== user.password) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ email,name: user.name,designation: user.designation }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ 
        message: "Login successful", 
        token: token, 
        designation: user.designation  // Ensure this is sent
    });
});


    

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
