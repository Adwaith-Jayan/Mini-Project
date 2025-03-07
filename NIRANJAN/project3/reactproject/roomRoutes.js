import express from "express";
import Room from "./roomModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { room_no, name, type } = req.body;

        if (!room_no || !name || !type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRoom = new Room({ room_no, name, type });
        await newRoom.save();

        res.status(201).json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router; // ✅ Fix export
