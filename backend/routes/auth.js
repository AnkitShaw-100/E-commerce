import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();

// Sign-up function
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Database m check karo ki user pehele se hai ki nahi
    // Agar hai toh error ya warnging show krna hogaa
    // Agar nahi hai toh new user create krna hogaa
    // Frontend se given data ko db m store krna hogaa
    // jaab taak frontend nahi hai taab taak user data ko post se leke save krna hoga db m -> save krne ke liye .save function use hota hai
    // save krte time user ka password ko hash krna hogaa -> jiske liye bcrypt and use krnegee

    // 1. Database m check karo ki user pehele se hai ki nahi
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // 2. Password ko hash karna hoga before sending it to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. New user ko db m add kardo
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login function
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Checking the existence of user in db
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
