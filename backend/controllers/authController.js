import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModels.js";
import JWT from "jsonwebtoken";

// Register User
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, Answer } = req.body;
        // Validations
        if (!name) {
            return res.status(400).send({ message: "Name is required" });
        }
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }
        if (!password) {
            return res.status(400).send({ message: "Password is required" });
        }
        if (!phone) {
            return res.status(400).send({ message: "Phone no is required" });
        }
        if (!address) {
            return res.status(400).send({ message: "Address is required" });
        }
        if (!Answer) {
            return res.status(400).send({ message: "Answer is required" });
        }
        // Check User
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "Already registered, please login",
            });
        }
        // Register user
        const hashedPassword = await hashPassword(password);
        // Save
        const user = new userModel({
            name,
            email,
            phone,
            address,
            Answer,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        console.log("Registration Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error: error.message,
        });
    }
};

// Login User
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required",
            });
        }
        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Invalid password",
            });
        }
        // Token
        const token = JWT.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        return res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log("Login Error:", error);
        return res.status(500).send({
            success: false,
            message: "Error in Login",
            error: error.message,
        });
    }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, Answer, newPassword } = req.body;
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }
        if (!Answer) {
            return res.status(400).send({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.status(400).send({ message: "New password is required" });
        }
        // Check
        const user = await userModel.findOne({ email, Answer });
        // Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer",
            });
        }
        const hash = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hash });
        return res.status(200).send({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// Get all users (admin only, no password)
export const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({}, '-password');
        res.status(200).send({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};