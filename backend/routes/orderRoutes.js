import express from "express";
import auth from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderByID,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Buyer can place order
router.post("/", auth, authorizeRoles("buyer"), createOrder);

// Buyer get own orders
router.get("/my", auth, authorizeRoles("buyer"), getMyOrders);

// Buyer (own), Seller, Admin can view order by Id
router.get(
  "/:id",
  auth,
  authorizeRoles("buyer", "seller", "admin"),
  getOrderByID
);

// Admin get all orders
router.get("/", auth, authorizeRoles("admin"), getAllOrders);

// Seller/ Admin update order status
router.put("/:id", auth, authorizeRoles("seller", "admin"), updateOrderStatus);

export default router;
