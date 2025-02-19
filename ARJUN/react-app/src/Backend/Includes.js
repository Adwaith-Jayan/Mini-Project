import mongoose from "mongoose";

const includesSchema = new mongoose.Schema({
  item_no: { type: String, required: true },
  ident_no: { type: String, required: true }
});

const Includes = mongoose.models.Includes || mongoose.model("Includes", includesSchema, "includes");

export default Includes;