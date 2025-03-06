import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  room_no: { type: Number, required: true, unique: true },  
  custodian: String,  
  in_charge: String  
}); 


const Room = mongoose.models.Room ||  mongoose.model("Room", roomSchema, "room");

export default Room;
