import mongoose from "mongoose";

const clearenceSchema = new mongoose.Schema({
  item_no: { type: String, required: true },
  clearencedate: {type: Date},
  remarks: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending Clearance", "Resolved"],
    default: "Pending Clearance"
  }
});

const Clearance = mongoose.models.Clearance || mongoose.model("Clearance", clearenceSchema, "clearance");

export default Clearance;