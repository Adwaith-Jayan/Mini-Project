import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    otp: String,
    otpExpires: Date
});
 const User = mongoose.model('User', userSchema, 'user');

 export default User;
 
// // Access Schema
// const accessSchema = new mongoose.Schema({
//     email_id: String,
//     room_no: Number
// });
// export const Access = mongoose.model("Access", accessSchema, "access");

// // BelongsTo Schema
// const belongsToSchema = new mongoose.Schema({
//     item_no: String,
//     room_no: Number
// });
// export const BelongsTo = mongoose.model("BelongsTo", belongsToSchema, "belongs_to");

// // Item Schema
// const itemSchema = new mongoose.Schema({
//     item_no: String,
//     status: String,
//     type: String
// });
// export const Item = mongoose.model("Item", itemSchema, "item");

// // Includes Schema
// const includesSchema = new mongoose.Schema({
//     item_no: String,
//     ident_no: String,
//     sl_no: Number
// });
// export const Includes = mongoose.model("Includes", includesSchema, "includes");

// // Stock Schema
// const stockSchema = new mongoose.Schema({
//     name: String,
//     indent_no: String,
//     sl_no: Number,
//     qty: Number,
//     date_of_purchase: Date,
//     specification: String,
//     warranty_period: String,
//     price: Number
// });
// export const Stock = mongoose.model("Stock", stockSchema, "stock");
