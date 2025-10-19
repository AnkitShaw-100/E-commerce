import express from "express";
import auth from "../middleware/auth.js";
import { getUsers, getProfile, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

// Protected routes for current user
router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);

export default router;
