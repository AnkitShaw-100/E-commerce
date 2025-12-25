import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: [2, "Product name must be at least 2 characters"],
            maxlength: [100, "Product name must not exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [1000, "Description must not exceed 1000 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be positive"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Quantity must be positive"],
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
