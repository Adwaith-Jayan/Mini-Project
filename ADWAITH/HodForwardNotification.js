import mongoose from "mongoose";

const hodForwardNotificationSchema = new mongoose.Schema({
    type: { type: String, required: true },
    indent_no: { type: String, required: true },
    item_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date_of_purchase: { type: Date, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true }, // Array to store multiple Stock-In-Charge emails
    date: { type: Date, default: Date.now } // Renamed from timestamp to date
});

const HODForwardNotification = mongoose.model("HODForwardNotification", hodForwardNotificationSchema, "notifications");

export default HODForwardNotification;
