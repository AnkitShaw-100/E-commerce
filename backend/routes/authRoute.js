import express from "express";
import { registerController, loginController } from "../controllers/authController.js";
import { requiresSignIn } from "../middlewares/authMiddleware.js";

// Router Object
const router = express.Router();

// Routing
router.post('/register', registerController);

// Login 
router.post('/login', loginController);

// Protected route
router.get('/user-auth', requiresSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
export default router;