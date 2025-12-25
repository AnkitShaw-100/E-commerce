import express from "express";
import { placeOrderController, getUserOrdersController } from "../controllers/orderController.js";
import { requiresSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Place order
router.post("/place", requiresSignIn, placeOrderController);
// Get user orders
router.get("/user", requiresSignIn, getUserOrdersController);

export default router;
