// maintenanceschema.js
import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
  item_no: {
    type: String,
    required: true,
    unique: true,
  },
  service_provider: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  maintenance_date: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
    default: "Routine maintenance",
  },
});

const Maintenance = mongoose.models.Maintenance || mongoose.model("Maintenance", MaintenanceSchema,"maintenance");
export default Maintenance;
