import Product from '../models/Product.js';
import { uploadImageToCloudinary, deleteImageFromCloudinary } from '../utils/uploadToCloudinary.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('seller', 'name email');
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add product with image upload
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    let imageData = null;
    
    // Handle image upload
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file.path, 'products');
      
      if (!uploadResult.success) {
        return res.status(400).json({ 
          message: 'Image upload failed', 
          error: uploadResult.error 
        });
      }
      
      imageData = {
        url: uploadResult.url,
        publicId: uploadResult.publicId
      };
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      images: imageData, // Store Cloudinary data
      seller: req.user.id // Add seller from auth middleware
    });

    await newProduct.save();
    res.status(201).json({ 
      message: "Product added successfully",
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Authorization check (seller can only update their own products)
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    // Handle new image upload
    if (req.file) {
      // Delete old image from Cloudinary
      if (product.images && product.images.publicId) {
        await deleteImageFromCloudinary(product.images.publicId);
      }

      // Upload new image
      const uploadResult = await uploadImageToCloudinary(req.file.path, 'products');
      
      if (uploadResult.success) {
        req.body.images = {
          url: uploadResult.url,
          publicId: uploadResult.publicId
        };
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Authorization check
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    // Delete image from Cloudinary
    if (product.images && product.images.publicId) {
      await deleteImageFromCloudinary(product.images.publicId);
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};