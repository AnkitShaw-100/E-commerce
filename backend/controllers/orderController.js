import orderModel from "../models/orderModel.js";

// New order 
export const placeOrderController = async (req, res) => {
  try {
    const { orderId, items, subtotal, platformFee, deliveryCharge, total, paymentMethod } = req.body;
    const user = req.user._id;
    const order = new orderModel({
      user,
      orderId,
      items,
      subtotal,
      platformFee,
      deliveryCharge,
      total,
      paymentMethod
    });
    await order.save();
    res.status(201).send({ success: true, order });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error placing order", error: error.message });
  }
};

// Get all orders for a user
export const getUserOrdersController = async (req, res) => {
  try {
    const user = req.user._id;
    const orders = await orderModel.find({ user }).sort({ createdAt: -1 });
    res.status(200).send({ success: true, orders });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching orders", error: error.message });
  }
};
