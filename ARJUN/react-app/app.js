import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/Backend/database.js";
import loginauthRoutes from "./src/Backend/loginauth.js";
import registerRoutes from "./src/Backend/register.js";
import RoomRoutes from "./src/Backend/Room.js";
import StockdetailsRoutes from "./src/Backend/Stockdetails.js";
import StockstatusupdateRoutes from "./src/Backend/stockstatusupdate.js";
import addstocksicRoutes from "./src/Backend/addstocksic.js";
import RegistercomplaintRoutes from "./src/Backend/Registercomplaint.js";

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
app.use("/api/Room", RoomRoutes);
app.use("/api/stock", StockdetailsRoutes);
app.use("/api/ustock", StockstatusupdateRoutes); // ✅ Add new endpoint for stock status updates
app.use("/",addstocksicRoutes);
app.use("/api",RegistercomplaintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
