import express from "express";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get all products
router.get(
  "/",
  auth,
  authorizeRoles("buyer", "seller", "admin"),
  async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Getting single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Adding product
router.post(
  "/addProduct",
  auth,
  authorizeRoles("seller", "admin"),
  async (req, res) => {
    // Product ko simply db m add krna hai
    try {
      const { name, description, price, stock, category, images } = req.body;

      const newProduct = new Product({
        name,
        description,
        price,
        stock,
        category,
        images,
      });
      await newProduct.save();
      res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Updating product
router.put(
  "/:id",
  auth,
  authorizeRoles("seller", "admin"),
  async (req, res) => {
    // jo bhi prvs data hai usko replace krke new dena hai
    // usko kaise kar skte hai ?
    // is route pe ana hogaa - then new data dena hogaa usko save krna hoga db m like new prodcut create krte time kiyee
    const { id } = req.params;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Deleting product
router.delete(
  "/:id",
  auth,
  authorizeRoles("admin", "seller"),
  async (req, res) => {
    // Delete krne ke liye phele check krna hoga ki woh product exsists krta hai ki nahi
    // agar exsists hi nhi krtaa taab simple message ki aisa kuch db m nhi ahi
    // but agar krta hai usse delete krke message ki prodecut deleted

    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product deleted succesfully" });
  }
);

export default router;
