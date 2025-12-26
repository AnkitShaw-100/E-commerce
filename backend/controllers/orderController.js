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

// Admin: get all orders and total revenue
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate('user', 'name email phone').sort({ createdAt: -1 });
    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
    res.status(200).send({ success: true, orders, totalRevenue });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching all orders", error: error.message });
  }
};
