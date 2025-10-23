import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// This file exports two async functions
// 1. uploadImageToCloudinary
export const uploadImageToCloudinary = async (
  filePath,
  folder = "ecommerce"
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder, // folder: Saves image inside Cloudinary folder
      use_filename: true, // use_filename: true Keeps the original file name.
      unique_filename: true, //unique_filename: true Cloudinary will make it unique by appending a random string
      overwrite: false, // overwrite: false Prevents overwriting existing files
      resource_type: "image", // resource_type: "image" Specifies we’re uploading an image
      transformation: [
        { width: 800, height: 600, crop: "limit" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } 

  // Clean up deleting the local file even id upload fails.
  catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch {}
    }
    return { success: false, error: error.message };
  }
};


// 2. deleteImageFromCloudinary
// permanently removes the image and Returns a simple success/error response.
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
