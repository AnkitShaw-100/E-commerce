import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // images: array of objects with url and optional publicId (cloudinary)
    images: [
      {
        url: { type: String },
        publicId: { type: String, default: null },
      },
    ],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    brand: { type: String },
    // 'stock' is used in controllers; keep countInStock for backwards compatibility
    stock: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
