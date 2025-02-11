import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { loginalg } from './loginalg';

const app = express();
app.use(express.json());
app.use(cors());

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

// Login Route - Use the loginUser function from the controller
app.post("/login", loginalg);  // Use the exported loginUser function here

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
