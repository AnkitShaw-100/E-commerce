import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadImageToCloudinary = async (
  fileURLToPath,
  folder = "ecommerce"
) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileURLToPath, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      resource_type: "image",
      transformation: [
        {
          width: 800,
          height: 600,
          crop: "limit",
        },
        {
          quality: "auto",
        },
        {
          format: "auto",
        },
      ],
    });

    // Delete temporary files
    fs.unlinkSync(filePath);
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    // Delete temp file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
