import User from "./models/User";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_jwt_secret";



const loginalg = async (req, res) => {
    const { email, password } = req.body;
    console.log("🔹 Login Request Received:", email, password);
    try{
        const user = await User.findOne({ email_id: email });
        console.log(user);
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare password using bcrypt
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ email, designation: user.designation }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ 
            message: "Login successful", 
            token: token, 
            designation: user.designation  // Ensure this is sent
        });
    }catch(ex){
        console.error("Login Error:", ex);
        res.status(500).json({ message: "Server error" });
    }
};

export {loginalg} ;