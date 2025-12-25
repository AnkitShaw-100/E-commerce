import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import axios from "axios";

const PaymentPage = () => {
  const [selected, setSelected] = useState("COD");
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [auth] = useAuth();
  const PLATFORM_FEE = 30;
  const DELIVERY_CHARGE = 50;
  const getSubtotal = () =>
    cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const getTotal = () => getSubtotal() + PLATFORM_FEE + DELIVERY_CHARGE;

  const handlePlaceOrder = async () => {
    const orderId = `OD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));
    try {
      await axios.post(
        "/api/v1/order/place",
        {
          orderId,
          items,
          subtotal: getSubtotal(),
          platformFee: PLATFORM_FEE,
          deliveryCharge: DELIVERY_CHARGE,
          total: getTotal(),
          paymentMethod: selected,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/order-success", { state: { orderId } });
    } catch (err) {
      alert("Order placement failed. Please try again.");
    }
  };

  return (
    <Layout title={"Select Payment Method"}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Select Payment Method</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 mb-4">
              <h5 className="mb-3">Order Summary</h5>
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={item._id}
                  >
                    <span>
                      {item.name}{" "}
                      <span className="text-muted">x{item.quantity || 1}</span>
                    </span>
                    <span>₹{item.price * (item.quantity || 1)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>₹{getSubtotal()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Platform Fee:</span>
                <span>₹{PLATFORM_FEE}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery Charges:</span>
                <span>₹{DELIVERY_CHARGE}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total Amount:</span>
                <span>₹{getTotal()}</span>
              </div>
            </div>
            <div className="card p-4">
              <h5 className="mb-3">Choose Payment Method</h5>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cod"
                  value="COD"
                  checked={selected === "COD"}
                  onChange={() => setSelected("COD")}
                />
                <label className="form-check-label" htmlFor="cod">
                  Cash on Delivery (COD)
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="online"
                  value="Online"
                  disabled
                />
                <label className="form-check-label " htmlFor="online">
                  Online Payment (Coming Soon)
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="netbanking"
                  value="NetBanking"
                  disabled
                />
                <label className="form-check-label af" htmlFor="netbanking">
                  Net Banking (Coming Soon)
                </label>
              </div>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={handlePlaceOrder}
                disabled={selected !== "COD"}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
