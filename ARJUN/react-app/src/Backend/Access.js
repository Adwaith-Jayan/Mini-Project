import mongoose from "mongoose";

// Define the schema for the Access model
const accessSchema = new mongoose.Schema({
  email_id: { type: String, required: true },  // Email ID of the user
  room_no: { type: Number, required: true },   // Room number the user has access to
});

// Create the Access model using the schema
const Access = mongoose.models.Access || mongoose.model("Access", accessSchema, "access");

export default Access;
