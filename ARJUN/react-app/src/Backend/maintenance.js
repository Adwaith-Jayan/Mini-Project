// maintenance.js (server)
import express from "express";
import Maintenance from "./Maintenanceschema.js";
import Item from "./Item.js";
import Clearance from "./clearenceschema.js";

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
      remarks: m.remarks || "No remarks",
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

// POST /api/maintenance/complete - Fixed completion logic
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
  
      // Update maintenance status
      if (field === "maintenanceStatus") {
        maintenance.status = value;
        await maintenance.save();
      }
  
      // Update item status
      if (field === "itemStatus") {
        item.status = value;
        await item.save();
  
        // Handle clearance if not working
        if (value === "Not Working") {
          await Clearance.create({
            item_no: maintenance.item_no,
            clearencedate: new Date(),
            remarks: maintenance.remarks,
            status: "Pending Clearance",
          });
        }
      }
  
      res.json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ message: "Failed to update status" });
    }
  });
  

export default router;