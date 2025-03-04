import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import VerifyNotification from "./Verifynotificationschema.js";
import Verificationmodel from "./Verificationlistschema.js";

dotenv.config();
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"; // Use .env for security



<<<<<<< HEAD
router.post("/reportviews", async (req, res) => {
=======
router.post("/report/reportviews", async (req, res) => {
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
      }
  
      // Decode the JWT token
      const decoded = jwt.verify(token, SECRET_KEY);
      const senderEmail = decoded.email;
  
      const { notifId } = req.body;
<<<<<<< HEAD
      console.log(notifId);
=======
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
      if (!notifId) {
        return res.status(400).json({ error: "Notification ID is required" });
      }
  
      // ✅ Find the notification and mark it as read
      const notification = await VerifyNotification.findByIdAndUpdate(
        notifId,
        { status: "read" },
        { new: true }
      );
  
      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }
<<<<<<< HEAD
      console.log(notification);
      const { verifier_email, date_of_verify } = notification;
  
      // ✅ Fetch all items verified by this email
      const items = await Verificationmodel.find({ verifier_email:verifier_email,verify_date:date_of_verify });
=======
  
      const { verifier_email, date_of_verify } = notification;
  
      // ✅ Fetch all items verified by this email
      const items = await Verificationmodel.find({ verifier_email:verifier_email,date_of_verify:date_of_verify });
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
  
      if (!items.length) {
        return res.status(404).json({ error: "No items found for this verifier" });
      }
<<<<<<< HEAD
      console.log(items);
=======
  
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
      // ✅ Format the response
      const itemDetails = items.map((item) => ({
        item_no: item.item_no,
        status: item.status,
        remarks: item.Remarks,
<<<<<<< HEAD
        date_of_verify: item.verify_date,
=======
        date_of_verify: item.date_of_verify,
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
      }));
  
      // ✅ Send the response in table format
      res.json({
        verifier_email,
        date_of_verify,
        itemDetails,
      });
  
    } catch (error) {
      console.error("❌ Error fetching report:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


<<<<<<< HEAD
  

=======
>>>>>>> 2f5ebf7528be1b646a978b429338b94082f52c05
export default router;