import express from "express";
import { placeOrderController, getUserOrdersController, getAllOrdersController } from "../controllers/orderController.js";
import { requiresSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Place order
router.post("/place", requiresSignIn, placeOrderController);

// Get user orders
router.get("/user", requiresSignIn, getUserOrdersController);

// Admin: get all orders
router.get("/all", requiresSignIn, isAdmin, getAllOrdersController);

export default router;
