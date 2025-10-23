import Product from "../models/Product.js";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "../utils/uploadToCloudinary.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name email");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("seller", "name email");

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
    const { name, description, price, stock, category, images } = req.body;

    let imagesArray = [];

    // Handle image upload from file
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(
        req.file.path,
        "products"
      );

      if (!uploadResult.success) {
        return res.status(400).json({
          message: "Image upload failed",
          error: uploadResult.error,
        });
      }

      imagesArray.push({
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      });
    }

    // Handle image links from req.body.images
    if (images) {
      if (Array.isArray(images)) {
        // multiple image links
        images.forEach((img) => {
          imagesArray.push({ url: img, publicId: null });
        });
      } else if (typeof images === "string") {
        // single image link
        imagesArray.push({ url: images, publicId: null });
      }
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      images: imagesArray,
      seller: req.user.id,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
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
    if (
      product.seller.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this product" });
    }

    // Accept removeImagePublicIds as array or comma-separated string
    const { removeImagePublicIds } = req.body;
    if (removeImagePublicIds) {
      const toRemove = Array.isArray(removeImagePublicIds)
        ? removeImagePublicIds
        : String(removeImagePublicIds)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

      if (toRemove.length > 0 && Array.isArray(product.images)) {
        // Delete from Cloudinary and from document
        for (const pid of toRemove) {
          try {
            await deleteImageFromCloudinary(pid);
          } catch (_) {}
        }
        product.images = product.images.filter(
          (img) => !img.publicId || !toRemove.includes(img.publicId)
        );
      }
    }

    // Handle new image upload via file
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(
        req.file.path,
        "products"
      );
      if (!uploadResult.success) {
        return res
          .status(400)
          .json({ message: "Image upload failed", error: uploadResult.error });
      }
      if (!Array.isArray(product.images)) product.images = [];
      product.images.push({
        url: uploadResult.url,
        publicId: uploadResult.publicId,
      });
    }

    // Handle images provided as URLs in body (string or array)
    if (req.body.images) {
      const incoming = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
      if (!Array.isArray(product.images)) product.images = [];
      for (const img of incoming) {
        if (typeof img === "string" && img.trim()) {
          product.images.push({ url: img.trim(), publicId: null });
        }
      }
      // prevent Mongoose from trying to set images to a string/array directly
      delete req.body.images;
    }

    // Update other mutable fields
    const allowed = [
      "name",
      "description",
      "price",
      "stock",
      "category",
      "brand",
    ];
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    }

    const saved = await product.save();

    res.json({ message: "Product updated successfully", product: saved });
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
    if (
      product.seller.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this product" });
    }

    // Delete all images from Cloudinary
    if (product.images && Array.isArray(product.images)) {
      for (const img of product.images) {
        if (img && img.publicId) {
          try {
            await deleteImageFromCloudinary(img.publicId);
          } catch (_) {}
        }
      }
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
