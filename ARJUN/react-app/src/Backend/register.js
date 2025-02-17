import mongoose from "mongoose";
import express from "express";
import User from "./usermodel.js";

const router = express.Router();

// Register a new user
router.post("/", async (req, res) => {
  try {
    const { firstName, email, password, role, inventory } = req.body;

    // Check if required fields are provided
    if (!firstName || !email || !password || !role || !inventory) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password before saving
    const Password = password;


    const roomSchema = new mongoose.Schema({
        name: String,
        room_no: Number,
        custodian: String,
        in_charge: String
    });
    const accessSchema = new mongoose.Schema({
      email_id: String,
      room_no: Number
    });

    const Room = mongoose.model("Room", roomSchema, 'room');
    const Access = mongoose.model("Access", accessSchema, 'access');
    const Roomdetails = await Room.findOne({ name: inventory }); 
    const Roomno = Roomdetails.room_no;
    console.log(Roomdetails);
    console.log(Roomno); 

    // Create a new user
    const newUser = new User({
      name: firstName,
      email_id: email,
      password: Password,
      designation: role
    });

    const newAccess = new Access({
      email_id: email,
      room_no: Roomno
  });

    // Save user to MongoDB
    await newUser.save();
    await newAccess.save();

    Roomdetails.name=firstName;
    if(role.toLowerCase() ==="stock-in-charge")
    {
      Roomdetails.in_charge=firstName;
    }
    if(role.toLowerCase() ==="custodian")
    {
      Roomdetails.custodian=firstName;
    }

    await Roomdetails.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
