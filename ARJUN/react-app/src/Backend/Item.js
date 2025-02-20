import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item_no: { type: String, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true }
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema, "item");

export default Item;