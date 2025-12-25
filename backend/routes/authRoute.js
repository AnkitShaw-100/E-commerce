import express from "express";
import { registerController, loginController, forgotPasswordController, getAllUsersController } from "../controllers/authController.js";
import { isAdmin, requiresSignIn } from "../middlewares/authMiddleware.js";

// Router Object
const router = express.Router();
// Get all users (admin only)
router.get('/all-users', requiresSignIn, isAdmin, getAllUsersController);

// Routing
router.post('/register', registerController);

// Forgot password
router.post('/forgot-password', forgotPasswordController);

// Login 
router.post('/login', loginController);

// User route
router.get('/user-auth', requiresSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// Admin route
router.get('/admin-auth', requiresSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})
export default router;