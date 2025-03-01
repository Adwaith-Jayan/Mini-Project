
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Maintenance from "./Maintenanceschema.js";
import Item from "./Item.js";
import Clearance from "./clearenceschema.js";
import MaintenanceHistory from "./Maintenancehistoryschema.js";
import Access from "./Access.js";
import BelongsTo from "./BelongsTo.js";
import Includes from "./Includes.js";
import Stock from "./Stock.js";

const router = express.Router();

// GET /api/maintenance/list - Fixed population logic
router.get("/list", async (req, res) => {
  try {
    const maintenanceList = await Maintenance.find();
    console.log("Found maintenance records:", maintenanceList.length);

    const itemNumbers = [...new Set(maintenanceList.map(m => m.item_no))];
    const items = await Item.find({ item_no: { $in: itemNumbers } });
    const itemMap = new Map(items.map(item => [item.item_no, item]));

    const transformedList = maintenanceList.map(m => ({
      _id: m._id,
      itemId: m.item_no,
      repairDate: m.complaint_date,
      serviceProvider: m.service_provider,
      amount: m.amount || 0,
      remarks: m.remarks,
      itemStatus: itemMap.get(m.item_no)?.status || "Unknown",
      maintenanceStatus: m.status
    }));

    console.log("Transformed records:", transformedList.length);
    res.json(transformedList);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ 
      message: "Failed to fetch maintenance data",
      error: error.message
    });
  }
});

// PUT /api/maintenance/update - Fixed update logic
router.put("/update", async (req, res) => {
  const { id, field, value } = req.body;
  const allowedFields = ["amount", "remarks", "service_provider"];

  try {
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field for update" });
    }

    const updated = await Maintenance.findByIdAndUpdate(
      id,
      { [field]: value },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ message: "Invalid update operation" });
  }
});

// POST /api/maintenance/complete 
router.post("/complete", async (req, res) => {
  const { id, field, value } = req.body;

  try {
    const maintenance = await Maintenance.findById(id);
    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    const item = await Item.findOne({ item_no: maintenance.item_no });
    if (!item) {
      return res.status(404).json({ message: "Linked item not found" });
    }

   
    if (field === "maintenanceStatus") {
      maintenance.status = value;
      await maintenance.save();
    }

   
    if (field === "itemStatus") {
      item.status = value;
      await item.save();

      
      if (maintenance.status === "Completed") {
      
        const newHistory = new MaintenanceHistory({
          item_no: maintenance.item_no,
          status: maintenance.status,
          completed_date: new Date(),
          remarks: maintenance.remarks,
          item_status: value,
          amount: maintenance.amount
        });
        await newHistory.save();

        
        if (value === "Working") {
          await Maintenance.findByIdAndDelete(id);
        }
        
      }
    }

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

router.get("/maintenancehistory", async (req, res) => {
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
    const maintenanceRecords = await MaintenanceHistory.find({ item_no: { $in: itemsInRoom } });


    // Map item status for quick lookup
    const itemStatusMap = maintenanceRecords.reduce((map, item) => {
      map[item.item_no] = item.item_status;
      return map;
    }, {});
    const maintenanceStatusMap = maintenanceRecords.reduce((map, item) => {
      map[item.item_no] = item.status;
      return map;
    }, {});

    // Construct stock info while avoiding duplicates
    const stockInfo = maintenanceRecords.map((record) => ({
      item_no: record.item_no,
      status: record.status || "Unknown",
      completed_date: record.completed_date, // This now ensures correct dates
      remarks: record.remarks,
      amount: record.amount,
      item_status: record.item_status || "Unknown",
    }));

    res.json(stockInfo);
  } catch (error) {
    console.error("❌ Error fetching stock details:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;