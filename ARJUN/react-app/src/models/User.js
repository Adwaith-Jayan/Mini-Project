import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    otp: String,
    otpExpires: Date
});

// Create the model
const User = mongoose.model('User', userSchema, 'user');

export default User; // Export the User model
