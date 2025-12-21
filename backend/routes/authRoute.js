import express from "express";
import { registerController, loginController, forgotPasswordController } from "../controllers/authController.js";
import { requiresSignIn } from "../middlewares/authMiddleware.js";

// Router Object
const router = express.Router();

// Routing
router.post('/register', registerController);

// Forgot password
router.post('/forgot-password', forgotPasswordController);

// Login 
router.post('/login', loginController);

// Protected route
router.get('/user-auth', requiresSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
export default router;