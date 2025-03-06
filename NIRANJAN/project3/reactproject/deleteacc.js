import express from "express";
import User from "./models.js"; // Ensure you have a User model

const router = express.Router();

// Delete user by email_id
router.delete("/delete", async (req, res) => {
  try {
    const { email_id } = req.body;
    if (!email_id) {
      return res.status(400).json({ message: "Email ID is required" });
    }

    const user = await User.findOne({ email_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ email_id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
