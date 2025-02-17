import express from "express";
import Room from "./Roommodel.js";  

const router = express.Router();

// Route to fetch all inventories (room names)
router.get("/inventory", async (req, res) => {
  try {
    const rooms = await Room.find({}, "name");  // Fetch only the 'name' field from the Room collection
    res.status(200).json(rooms);  // Send the room names as a response
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});

export default router;
