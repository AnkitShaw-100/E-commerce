import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from "slugify";

// Create Product
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validate required fields
        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Validate photo
        if (!photo) {
            return res.status(400).send({ message: "Product photo is required" });
        }
        if (photo.size > 5 * 1024 * 1024) { // 5MB
            return res.status(400).send({ message: "Photo should be less than 25MB" });
        }

        const existingProduct = await productModel.findOne({ name });
        if (existingProduct) {
            return res.status(409).send({
                success: false,
                message: 'Product Already Exists'
            });
        }

        const product = new productModel({
            name,
            slug: slugify(name),
            description,
            price,
            category,
            quantity,
            shipping: shipping || false
        });

        // Save photo data
        if (photo) {
            console.log(fs.readFileSync(photo.path))
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();

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
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        product.name = name;
        product.slug = slugify(name);
        product.description = description;
        product.price = price;
        product.category = category;
        product.quantity = quantity;
        product.shipping = shipping;
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
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
        // Only fetch fields needed for the card, NOT photo data
        const products = await productModel.find()
            .select('name description category shipping price slug photo')
            .populate('category', 'name');
        res.status(200).json({
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
        const product = await productModel.findOne({ slug: req.params.slug })
            .select('-photo')
            .populate('category');
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

// Get product photo by id
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');
        if (product && product.photo && product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.send(product.photo.data);
        } else {
            return res.status(404).send({ message: 'No photo found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error fetching product photo', error: error.message });
    }
};