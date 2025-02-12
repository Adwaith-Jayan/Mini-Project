import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // ✅ Allow frontend requests
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Ensure MONGO_URI is defined
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Set it in the .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
});

// ✅ Define User Schema
const userSchema = new mongoose.Schema({
  email_id: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "user");  // Third argument forces collection name


// ✅ Login Route
app.post("/login", async (req, res) => {
  const { email_id, password } = req.body;
  console.log("📌 Received login request:", email_id, password); // Debug log

  try {
    const foundUser = await User.findOne({ email_id, password });

    if (foundUser) {
      console.log("✅ User found:", foundUser);
      return res.json({ success: true });
    } else {
      console.warn("❌ Invalid credentials:", email_id);
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Root API Check
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
