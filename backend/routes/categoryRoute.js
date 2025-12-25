import express from 'express';
import { isAdmin, requiresSignIn } from './../middlewares/authMiddleware.js';
import { createCategoryController, updateCategoryController, categoryContoller, singleCategoryController, deleteCategoryController } from '../controllers/createCategoryController.js';
const router = express.Router();

// Create Category
router.post('/create-category', requiresSignIn, isAdmin, createCategoryController);

// Update Category
router.put('/update-category/:id', requiresSignIn, isAdmin, updateCategoryController);

// Get all category
router.get('/get-category', categoryContoller);

// Single category
router.get('/single-category/:slug', singleCategoryController);

// Delete category
router.delete('/delete-category/:id', requiresSignIn, isAdmin, deleteCategoryController);

export default router;
