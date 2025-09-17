import express from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get all products (public route)
router.get("/", getAllProducts);

// Get single product (public route)
router.get("/:id", getProductById);

// Add product (with image upload)
router.post(
  "/addProduct",
  auth,
  authorizeRoles("seller", "admin"),
  upload.single("image"), // Add multer middleware
  addProduct
);

// Update product (with image upload)
router.put(
  "/:id",
  auth,
  authorizeRoles("seller", "admin"),
  upload.single("image"), // Add multer middleware
  updateProduct
);

// Delete product
router.delete("/:id", auth, authorizeRoles("admin", "seller"), deleteProduct);

export default router;
