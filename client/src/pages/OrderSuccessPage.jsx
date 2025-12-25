import React from "react";
import Layout from "../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Get orderId from state or query param
  const orderId =
    location.state?.orderId ||
    new URLSearchParams(location.search).get("orderId");

  return (
    <Layout title={"Order Placed Successfully"}>
      <div className="container mt-5 text-center">
        <div className="card p-5 mx-auto" style={{ maxWidth: 500 }}>
          <h2 className="mb-3 text-success">Order Placed!</h2>
          <p className="mb-2">Thank you for shopping with us.</p>
          <h5 className="mb-4">Your Order ID:</h5>
          <div className="display-6 fw-bold mb-4">{orderId || "N/A"}</div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard/user/orders")}
          >
            View Order History
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;
