import mongoose from "mongoose";

const accessSchema = new mongoose.Schema({
    room_no: { type: Number, required: true },
    email_id: { type: String, required: true }
});

const Access = mongoose.model("Access", accessSchema, "access");

export default Access;
