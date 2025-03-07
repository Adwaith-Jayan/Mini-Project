import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  room_no: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const Room = mongoose.model("Room", roomSchema,"room");

export default Room; // ✅ Use "export default"
