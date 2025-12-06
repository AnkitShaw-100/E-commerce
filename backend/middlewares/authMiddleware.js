import JWT from 'jsonwebtoken';
import userModel from '../models/userModels.js';

// Protected Route
export const requiresSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Authorization token required'
            });
        }
        // Remove 'Bearer ' prefix if present
        const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decode = JWT.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        console.log('Auth Error:', error);
        return res.status(401).send({
            success: false,
            message: 'Invalid or expired token'
        });
    }
}

// Admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user || user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized Access - Admin only'
            });
        }
        next();
    }
    catch (error) {
        console.log('Admin Check Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Error checking admin status'
        });
    }
}
