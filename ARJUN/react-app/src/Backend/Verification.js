import express from "express";
import Verificationmodel from "./Verificationlistschema.js";
import Item from "./Item.js";
import VerifyNotification from "./Verifynotificationschema.js";
import Access from "./Access.js";
import Room from "./Roommodel.js";
import User from "./usermodel.js";
import mongoose from "mongoose";
import Clearance from "./clearenceschema.js";
import Maintenance from "./Maintenanceschema.js";

const router = express.Router();

// Route to create a new verification entry
router.post("/Verification", async (req, res) => {
    try {
        const { verifierName, verifierEmail, dateOfVerify, itemNo, statusOfItem, remarks } = req.body;

        // Validate required fields
        if (!verifierName || !verifierEmail || !itemNo || !dateOfVerify || !statusOfItem || !remarks) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Ensure item exists in database
        const item = await Item.findOne({ item_no:itemNo });
        const roomnode=await Access.findOne({email_id: verifierEmail});
        const roomname=await Room.findOne({room_no: roomnode.room_no});
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }


        // Create verification record in Verificationlist collection
        const newVerification = new Verificationmodel({
            verifier_name: verifierName,
            verifier_email: verifierEmail,
            item_no: itemNo,
            date_of_verify: dateOfVerify,
            status: statusOfItem,
            Remarks: remarks || ""
        });

        if(statusOfItem==="Not Repairable")
        {

            const newclear = new Clearance({
                item_no: itemNo,
                remarks: remarks,
                status: "Pending Clearance"
            });
            await newclear.save();

            await Maintenance.deleteOne({item_no: itemNo});

        }

        await newVerification.save();
        

        const principal = await User.findOne({ designation: "principal" });

        if (principal) {
            const newverifierNotification = new VerifyNotification({
                type: "verifier_report",
                sender: verifierEmail,
                receiver: principal.email_id,
                verifier_name: verifierName,
                verifier_email: verifierEmail,
                premise: roomname.name,
                verify_date: dateOfVerify,
                status: "unread",
                date: new Date().toISOString()
            });
            await newverifierNotification.save();
        }

        return res.status(201).json({ message: "Verification created successfully", newVerification });
    } catch (error) {
        console.error("Error creating verification:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
