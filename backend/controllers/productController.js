import productModel from "../models/productModel.js";
import slugify from "slugify";

// Create Product
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const existingProduct = await productModel.findOne({ name });
        if (existingProduct) {
            return res.status(409).send({
                success: false,
                message: 'Product Already Exists'
            });
        }
        const product = await new productModel({
            name,
            slug: slugify(name),
            description,
            price,
            category,
            quantity,
            shipping: shipping || false
        }).save();
        res.status(201).send({
            success: true,
            message: 'New product created',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in product",
            error: error.message
        });
    }
};

// Update Product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;
        const { id } = req.params;
        const product = await productModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name), description, price, category, quantity, shipping },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: "Error while updating product"
        });
    }
};

// Get all products
export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category');
        res.status(200).send({
            success: true,
            message: 'All Products List',
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error while getting all products'
        });
    }
};

// Get single product by slug
export const singleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category');
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Single product fetched',
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error while getting single product'
        });
    }
};

// Delete product by id
export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await productModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
            product: deleted
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error while deleting product'
        });
    }
};
