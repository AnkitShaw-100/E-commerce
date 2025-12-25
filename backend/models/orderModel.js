import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
      unique: true,
      trim: true,
      minlength: [6, "Order ID must be at least 6 characters"],
      maxlength: [30, "Order ID must not exceed 30 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User reference is required"],
    },
    items: [
      {
        productId: {
          type: String,
          required: [true, "Product ID is required"],
        },
        name: {
          type: String,
          required: [true, "Product name is required"],
        },
        price: {
          type: Number,
          required: [true, "Product price is required"],
          min: [0, "Price must be positive"],
        },
        quantity: {
          type: Number,
          required: [true, "Product quantity is required"],
          min: [1, "Quantity must be at least 1"],
        },
      },
    ],
    total: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total must be positive"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: ["COD", "Online"],
      default: "COD",
    },
    status: {
      type: String,
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", orderSchema);
