import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Access from "./Access.js";
import BelongsTo from "./BelongsTo.js";
import Item from "./Item.js";
import Includes from "./Includes.js";
import Stock from "./Stock.js";

dotenv.config();
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received Token:", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const accessData = await Access.findOne({ email_id: email });
    if (!accessData) return res.status(404).json({ message: "No access data found" });

    const room_no = accessData.room_no;
    const itemsInRoom = await BelongsTo.find({ room_no }).distinct("item_no");
    const indentRecords = await Includes.find({ item_no: { $in: itemsInRoom } });
    const indentNoSet = new Set(indentRecords.map((record) => record.indent_no));

    // Fetch stock details only where type is "Furniture"
    const stockDetails = await Stock.find({ 
      indent_no: { $in: Array.from(indentNoSet) },
      type: "Furniture"
    });

    const itemDetails = await Item.find({ item_no: { $in: itemsInRoom } });
    const itemStatusMap = itemDetails.reduce((map, item) => {
      map[item.item_no] = item.status;
      return map;
    }, {});

    const stockInfo = indentRecords.map((record) => {
      const stock = stockDetails.find((s) => s.indent_no === record.indent_no);
      if (!stock) return null;

      return {
        item_no: record.item_no,
        indent_no: stock.indent_no || "N/A",
        item_name: stock.name,
        date_of_invoice: stock.date_of_purchase,
        description: stock.specification,
        price: stock.price,
        status: itemStatusMap[record.item_no] || "Unknown",
        type: stock.type
      };
    }).filter(Boolean);

    res.json(stockInfo);
  } catch (error) {
    console.error("❌ Error fetching stock details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;