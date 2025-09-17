import Order from "../models/Order.js";

// POST /api/orders → buyer order place kare
export const createOrder = async (req, res) => {
  // Phele check karo order schema m jo data aya hai woh thik hai ki nahi
  try {
    const { orderItems, totalPrice } = req.body;
    // If thik nahi hai then error return kardo
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // new order object banao
    const order = new Order({
      user: req.user.id, // jisne order kiya hai uska id
      orderItems, // kya kya cheez order ki hai
      totalPrice, // kitna paisa
    });

    const createdOrder = await order.save();
    res.status(201).json(createOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/my → buyer apne orders dekhe
export const getMyOrders = async (req, res) => {
  try {
    // Ye ek path hai jo nested relationships ko define karta hai
    // Matlab: orderItems field ke andar jo product field hai, usse populate karna hai
    // Example: Agar aapke pass Order model hai jisme orderItems array hai, aur har orderItem mein product reference hai, to ye us product ki details fetch karega
    const orders = await Order.find({ user: req.user.id }).populate(
      "orderItems.product",
      //       Ye select fields hain - sirf ye specific fields return karenge
      // Matlab: Product ki saari details nahi, sirf name aur price fields hi return karni hain
      // Space-separated string format mein likha gaya hai
      "name price"
    );
    req.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:id → ek order detail (buyer/seller/admin jo allowed hai)
export const getOrderByID = async (req, res) => {
  try {
    const order = await Order.findById(req.param.id).populate(
      "user",
      "name email"
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      req.user.role === "Buyer" &&
      order.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders → saare orders (sirf admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/orders/:id → seller/admin order status update kare (pending → shipped → delivered)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    const updateOrder = await order.save();
    req.json(updateOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
