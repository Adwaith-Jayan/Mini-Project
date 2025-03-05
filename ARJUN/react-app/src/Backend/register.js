import express from "express";
import dotenv from "dotenv";
import User from "./usermodel.js";
import Room from "./Roommodel.js";
import Access from "./Access.js";
import nodemailer from "nodemailer";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register a new user
router.post("/", async (req, res) => {
  try {
    const { firstName, email, password, role, inventory, lastdate } = req.body;

    if (!firstName || !email || !password || !role || !inventory) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const Password = password;

    let validRoomNos = [];

    if (role.toLowerCase() === "furniture-custodian" || role.toLowerCase() === "furniture-verifier") {
      const roomRecords = await Room.find({}, "room_no");
      validRoomNos = roomRecords
        .map(data => Number(data.room_no)) // Convert to Number
        .filter(room => !isNaN(room)); // Remove invalid values

      console.log("Filtered and converted room numbers:", validRoomNos);

      if (validRoomNos.length === 0) {
        return res.status(404).json({ message: "Inventory rooms not found" });
      }

    // Create a new user
    const newUser = new User({
      name: firstName,
      email_id: email,
      password: Password,
      designation: role,
    });

    await newUser.save();
    const Roomdetails = await Room.findOne({ name: inventory });
    // Insert room access records only if they don't exist
    for (const room of validRoomNos) {
      console.log("Processing room number:", room);
        const newAccess = new Access({
          email_id: email,
          room_no: room,
        });
        await newAccess.save();
    }

      if (role.toLowerCase() === "furniture-custodian") {
        Roomdetails.furniture_custodian = firstName;
      }
      await Roomdetails.save();

      if (role.toLowerCase() === "furniture-verifier") {
        const formattedDate = lastdate ? new Date(lastdate).toLocaleDateString() : "N/A";

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: `Appointment as Furniture Verifier for RIT – ${inventory} Department`,
          text: `Hello, ${firstName}\n\nI hope this email finds you well.\n\nI am pleased to inform you that you have been appointed as the furniture-verifier for the ${inventory} department. As part of this role, you are required to verify the records in the Department Stock Management System within the stipulated timeframe.\n\nBelow are your login credentials for accessing the system:\n\nEmail id: ${email}\nPassword: ${Password}\n\nKindly ensure that the verification process is completed by ${formattedDate}. Should you require any assistance or clarification, please do not hesitate to reach out.\n\nWe appreciate your cooperation and diligence in this matter.\n\nBest regards,\nHead of Department, CSE\nRIT\n`,
        };
        await transporter.sendMail(mailOptions);
      }
    } else {
      console.log("hello");
      const Roomdetails = await Room.findOne({ name: inventory });
      if (!Roomdetails) {
        return res.status(404).json({ message: "Inventory not found" });
      }

      const Roomno = Roomdetails.room_no;
      const newUser = new User({
        name: firstName,
        email_id: email,
        password: Password,
        designation: role,
      });

      await newUser.save();

      // Remove existing access records for this email (optional)
      await Access.deleteMany({ email_id: email });

      // Insert single room access entry
      await Access.create({ email_id: email, room_no: Roomno });

      if (role.toLowerCase() === "stock-in-charge") {
        Roomdetails.in_charge = firstName;
      }
      if (role.toLowerCase() === "custodian") {
        Roomdetails.custodian = firstName;
      }

      await Roomdetails.save();
    }

    if (role.toLowerCase() === "verifier") {
      const formattedDate = lastdate ? new Date(lastdate).toLocaleDateString() : "N/A";

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Appointment as Verifier for Premise – ${inventory}`,
        text: `Hello, ${firstName}\n\nI hope this email finds you well.\n\nI am pleased to inform you that you have been appointed as the verifier for the ${inventory}. As part of this role, you are required to verify the records in the Department Stock Management System within the stipulated timeframe.\n\nBelow are your login credentials for accessing the system:\n\nEmail id: ${email}\nPassword: ${Password}\n\nKindly ensure that the verification process is completed by ${formattedDate}. Should you require any assistance or clarification, please do not hesitate to reach out.\n\nWe appreciate your cooperation and diligence in this matter.\n\nBest regards,\nHead of Department, CSE\nRIT\n`,
      };
      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
