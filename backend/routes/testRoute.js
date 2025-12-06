import express from "express";
import { requiresSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Test route - Admin only
router.get('/admin', requiresSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Hello Admin! You have access to this protected route.'
    });
});

// Test route - Any authenticated user - For future Implementation 
router.get('/user', requiresSignIn, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Hello User! You are authenticated.'
    });
});

export default router;
