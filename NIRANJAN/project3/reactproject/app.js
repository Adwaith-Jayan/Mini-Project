import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import loginRoutes from "./login.js";
import roomRoutes from "./roomRoutes.js";
import stockRoutes from "./stockdetails.js";
import deleteaccRoutes from "./deleteacc.js"; 

const app = express();
app.use(express.json());
app.use(cors());

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

// API Routes (use a base path)
app.use("/api/login", loginRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/stocks", stockRoutes); // ✅ Now stockdetails.js is registered
app.use(deleteaccRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
