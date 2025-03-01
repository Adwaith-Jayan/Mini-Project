import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
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
  
    const { firstName, email, password, role, inventory,lastdate} = req.body;

    // Check if required fields are provided
    if (!firstName || !email || !password || !role || !inventory) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists

    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(409).json({ message: "Email already registered" });
    // }

    // Hash the password before saving
    const Password = password;

    let RoomModel = mongoose.models.Room || mongoose.model("Room", roomSchema, "room");
    let AccessModel = mongoose.models.Access || mongoose.model("Access", accessSchema, "access");
    
    const Roomdetails = await RoomModel.findOne({ name: inventory }); 
    const Roomno = Roomdetails.room_no;
    const Accessdetails = await AccessModel.findOne({ room_no: Roomno }); 
    console.log(Roomdetails);
    console.log(Roomno); 

    // Create a new user
    const newUser = new User({
      name: firstName,
      email_id: email,
      password: Password,
      designation: role
    });
    if(Accessdetails)
    {
      const newAccess = new Access({
        email_id: email,
        room_no: Roomno
      });
      await newAccess.save();
    }
    else{
      const newAccess = new Access({
        email_id: email,
        room_no: Roomno
    });
    await newAccess.save();

    }

    

    // Save user to MongoDB
    await newUser.save();
    

    if(role.toLowerCase() ==="stock-in-charge")
    {
      Roomdetails.in_charge=firstName;
    }
    if(role.toLowerCase() ==="custodian")
    {
      Roomdetails.custodian=firstName;
    }

    await Roomdetails.save();
    if(role.toLowerCase()==="verifier")
    {
      const emailBody = `\nEmail id : ${email} , \nPassword: ${Password}`;
      const formattedDate = lastdate ? new Date(lastdate).toLocaleDateString() : "N/A";
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Appointment as Verifier for Premise – ${inventory}`,
        text: `Hello, ${firstName}\n\nI hope this email finds you well.\n\nI am pleased to inform you that you have been appointed as the verifier for the ${inventory}. As part of this role, you are required to verify the records in the Department Stock Management System within the stipulated timeframe.\n\nBelow are your login credentials for accessing the system:\n\n${emailBody}\n\nKindly ensure that the verification process is completed by ${formattedDate}. Should you require any assistance or clarification, please do not hesitate to reach out.\n\nWe appreciate your cooperation and diligence in this matter.\n\nBest regards,\nHead of Department,CSE\nRIT\n`
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
