import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  subtotal: Number,
  platformFee: Number,
  deliveryCharge: Number,
  total: Number,
  paymentMethod: String,
  status: {
    type: String,
    default: "Placed"
  }
}, { timestamps: true });

export default mongoose.model("orders", orderSchema);
