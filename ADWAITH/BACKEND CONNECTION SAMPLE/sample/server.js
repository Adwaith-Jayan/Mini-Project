import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/users', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit on failure
    }
};
connectDB();

// ✅ Define User Model
const UserSchema = new mongoose.Schema({
    email_id: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('user', UserSchema);

app.post('/login', async (req, res) => {
    try {
        const { email_id, password } = req.body;
        console.log("🔹 Login Request Received:", email_id, password);

        // ✅ Fetch and print all users for debugging
        const allUsers = await User.find({}).lean();  // 🔄 FIXED: Replaced .toArray() with .lean()
        console.log("📋 All Users in DB:", allUsers);

        const user = await User.findOne({ email_id }).lean();

        console.log("🔍 User Found:", user);

        if (!user) {
            console.log("❌ User Not Found");
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        if (user.password !== password) {
            console.log("❌ Incorrect Password");
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        console.log("✅ Login Successful:", user.email_id);
        return res.json({ success: true, message: "Login Successful!" });

    } catch (error) {
        console.error("❌ Error in Login:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
