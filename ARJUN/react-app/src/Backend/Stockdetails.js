import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Access from "./Access.js";
import BelongsTo from "./Belongsto.js";
import Item from "./Item.js";
import Includes from "./Includes.js";
import Stock from "./Stock.js";

dotenv.config();
const router = express.Router();

router.get("/stockdetails", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received Token:", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    
    const accessData = await Access.findOne({ email_id: email });
    if (!accessData) return res.status(404).json({ message: "No access data found" });
    
    const room_no = accessData.room_no;
    
    const itemsInRoom = await BelongsTo.find({ room_no }).select("item_no");
    console.log(itemsInRoom);
    const itemNumbers = itemsInRoom.map(item => item.item_no);
    
    const identNumbers = await Includes.find({ item_no: { $in: itemNumbers } });
    const identNoList = identNumbers.map(i => i.indent_no);
    console.log("identnmbrtlist",identNoList);
    const stockDetails = await Stock.find({ indent_no: { $in: identNoList } });
    const itemDetails = await Item.find({ item_no: { $in: itemNumbers } });

    const identMap = identNumbers.reduce((map, i) => {
        if (!map[i.indent_no]) map[i.indent_no] = [];
        map[i.indent_no].push(i.item_no);
        return map;
      }, {});
  
      const itemMap = itemDetails.reduce((map, item) => {
        map[item.item_no] = item.status;
        return map;
      }, {});
  
      const stockInfo = stockDetails.flatMap(stock => {
        const relatedItems = identMap[stock.indent_no] || [];
  
        return relatedItems.map(item_no => ({
          item_no,
          indent_no: stock.indent_no || "N/A",
          item_name: stock.name,
          date_of_invoice: stock.date_of_purchase,
          description: stock.specification,
          price: stock.price,
          status: itemMap[item_no] || "Unknown"
        }));
      });
  
      res.json(stockInfo);
    } catch (error) {
      console.error("❌ Error fetching stock details:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

export default router;