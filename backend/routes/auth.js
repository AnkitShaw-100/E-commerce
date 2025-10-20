import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
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

// Forgot password: send OTP to user's email
router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    user.resetOtp = otp;
    user.resetOtpExpires = expires;
    await user.save();

    // send email using nodemailer
    let transporter;
    let usingTestAccount = false;
    try {
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpHost || !smtpUser || !smtpPass) {
        // Fallback to a nodemailer test account for local development
        usingTestAccount = true;
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      } else {
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: smtpUser, pass: smtpPass },
        });
      }

      const mailOptions = {
        from: process.env.SMTP_FROM || 'no-reply@example.com',
        to: user.email,
        subject: 'Your password reset OTP',
        text: `Your password reset code is: ${otp}. It expires in 10 minutes.`,
      };

      const info = await transporter.sendMail(mailOptions);

      // If using test account, provide preview URL to help debugging
      if (usingTestAccount) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.warn('Sent test OTP email, preview URL:', previewUrl);
        return res.json({ message: 'OTP sent (test)', previewUrl });
      }

      res.json({ message: 'OTP sent to email' });
    } catch (mailErr) {
      console.error('Error sending OTP email', mailErr);
      // If sending email fails, respond with a helpful message instead of a vague 500
      return res.status(502).json({ message: 'Failed to send OTP email', detail: mailErr?.message });
    }
  } catch (error) {
    console.error('Forgot password error', error);
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.resetOtp || !user.resetOtpExpires) return res.status(400).json({ message: 'No OTP requested' });
    if (new Date() > new Date(user.resetOtpExpires)) return res.status(400).json({ message: 'OTP expired' });
    if (String(user.resetOtp) !== String(otp)) return res.status(400).json({ message: 'Invalid OTP' });

    // OTP valid — respond with a temporary token (short lived) or ok status
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ message: 'OTP verified', token });
  } catch (error) {
    console.error('Verify OTP error', error);
    res.status(500).json({ message: error.message });
  }
});

// Reset password using token (or using email+otp flow). We'll accept token in body.
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: 'Token and newPassword required' });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    // clear reset otp fields
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error', error);
    res.status(500).json({ message: error.message });
  }
});
