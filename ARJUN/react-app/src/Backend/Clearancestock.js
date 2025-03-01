
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Clearance from "./clearenceschema.js";
import Access from "./Access.js";
import BelongsTo from "./BelongsTo.js";
import Includes from "./Includes.js";
import Stock from "./Stock.js";

const router = express.Router();


router.get("/stockclearance", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Received Token:", token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;
  
      // Get room number based on user access
      const accessData = await Access.findOne({ email_id: email });
      if (!accessData) return res.status(404).json({ message: "No access data found" });
  
      const room_no = accessData.room_no;
  
      // Find unique item numbers in the room
      const itemsInRoom = await BelongsTo.find({ room_no }).distinct("item_no");
  
      // Find indent numbers for those items
      const clearanceRecords = await Clearance.find({ item_no: { $in: itemsInRoom } });
  
  
      // Construct stock info while avoiding duplicates
      const stockInfo = clearanceRecords.map((record) => ({
        item_no: record.item_no,
        remarks: record.remarks,
        status: record.status || "Unknown",
        clearance_date: record.clearance_date
      }));
  
      res.json(stockInfo);
    } catch (error) {
      console.error("❌ Error fetching stock details:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

router.post("/clear-stock", async (req, res) => {
  const { item_ids } = req.body;

  try {
    await Clearance.updateMany(
      { item_no: { $in: item_ids } },
      { $set: { status: "Cleared", clearance_date: new Date().toISOString()} }
    );

    res.status(200).json({ message: "Stock cleared successfully" });
  } catch (error) {
    console.error("Error updating stock clearance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  
  
export default router;