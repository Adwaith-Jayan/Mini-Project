import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/Backend/database.js";
import loginauthRoutes from "./src/Backend/loginauth.js";
import registerRoutes from "./src/Backend/register.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/loginauth", loginauthRoutes);
app.use("/api/register", registerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
