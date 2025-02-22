import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Access from "./Access.js";
import BelongsTo from "./BelongsTo.js";
import Item from "./Item.js";
import Includes from "./Includes.js";
import Stock from "./Stock.js";
import Maintenance from "./Maintenanceschema.js";

dotenv.config();
const router = express.Router();

router.get("/registercomplaint", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Get room number based on user access
    const accessData = await Access.findOne({ email_id: email });
    if (!accessData) return res.status(404).json({ message: "No access data found" });

    const room_no = accessData.room_no;
    const itemsInRoom = await BelongsTo.find({ room_no }).distinct("item_no");

    // Fetch items under maintenance
    const maintenanceItems = await Maintenance.find().distinct("item_no");

    // Fetch only "Not Working" items and exclude under-maintenance items
    const notWorkingItems = await Item.find({
      item_no: { $in: itemsInRoom, $nin: maintenanceItems },
      status: "Not Working"
    });

    const indentRecords = await Includes.find({ item_no: { $in: notWorkingItems.map(item => item.item_no) } });
    const indentNoSet = new Set(indentRecords.map(record => record.indent_no));
    const stockDetails = await Stock.find({ indent_no: { $in: Array.from(indentNoSet) } });

    const stockInfo = indentRecords.map((record) => {
      const stock = stockDetails.find(s => s.indent_no === record.indent_no);
      const item = notWorkingItems.find(i => i.item_no === record.item_no);
      if (!stock || !item) return null;

      return {
        item_no: record.item_no,
        indent_no: stock.indent_no || "N/A",
        item_name: stock.name,
        date_of_invoice: stock.date_of_purchase,
        description: stock.specification,
        price: stock.price,
        status: item.status,
      };
    }).filter(Boolean);

    res.json(stockInfo);
  } catch (error) {
    console.error("❌ Error fetching complaint items:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
