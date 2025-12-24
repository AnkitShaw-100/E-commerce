import express from 'express';
import { requiresSignIn, isAdmin } from './../middlewares/authMiddleware.js';
import {
  createProductController,
  updateProductController,
  getAllProductsController,
  singleProductController,
  deleteProductController
} from '../controllers/productController.js';

const router = express.Router();

// Create Product
router.post('/create-product', requiresSignIn, isAdmin, createProductController);

// Update Product
router.put('/update-product/:id', requiresSignIn, isAdmin, updateProductController);

// Get all products
router.get('/get-products', getAllProductsController);

// Get single product
router.get('/single-product/:slug', singleProductController);

// Delete product
router.delete('/delete-product/:id', requiresSignIn, isAdmin, deleteProductController);

export default router;
