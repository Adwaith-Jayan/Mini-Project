// maintenanceschema.js
import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
  item_no: {
    type: String,
    required: true,
    ref: "Item", // Reference to the Item schema if needed
  },
  complaint_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  service_provider: {
    type: String,
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  remarks: {
    type: String,
  },
});

const Maintenance = mongoose.models.Maintenance || mongoose.model("Maintenance", MaintenanceSchema,"maintenance");
export default Maintenance;
