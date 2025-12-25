import express from 'express';
import { requiresSignIn, isAdmin } from './../middlewares/authMiddleware.js';
import { createProductController, updateProductController, getAllProductsController, singleProductController, deleteProductController, productPhotoController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// Create Product
router.post('/create-product', requiresSignIn, isAdmin, formidable(), createProductController);

// Get product photo
router.get('/product-photo/:pid', productPhotoController);

// Update Product (with formidable for file upload)
router.put('/update-product/:id', requiresSignIn, isAdmin, formidable(), updateProductController);

// Get all products
router.get('/get-products', getAllProductsController);

// Get single product
router.get('/single-product/:slug', singleProductController);

// Delete product
router.delete('/delete-product/:id', requiresSignIn, isAdmin, deleteProductController);

export default router;
