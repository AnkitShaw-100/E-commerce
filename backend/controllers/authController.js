import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModels.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // Validations
        if (!name) {
            return res.send({ error: 'Name is required' });
        }
        if (!email) {
            return res.send({ error: "Email is required" });
        }
        if (!password) {
            return res.send({ error: "Password is Required" });
        }
        if (!phone) {
            return res.send({ error: 'Phone no is required' });
        }
        if (!address) {
            return res.send({ error: "Address is Required" });
        }
        // Check User
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'Already registered, please login',
            });
        }
        // Register user 
        const hashedPassword = await hashPassword(password);
        // Save
        const user = new userModel({ name, email, phone, address, password: hashedPassword });
        await user.save();
        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        })
    }
    catch (error) {
        console.log('Registration Error:', error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error: error.message
        });
    }
}


// POST Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required',
            });
        }
        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid password',
            });
        }
        // Token
        const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log('Login Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Error in Login',
            error: error.message,
        });
    }
};