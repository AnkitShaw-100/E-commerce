import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/v1/order/user", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setOrders(data.orders || []);
      } catch (err) {
        setOrders([]);
      }
    };
    if (auth.token) fetchOrders();
  }, [auth.token]);

  return (
    <div
      className="card shadow-sm w-100"
      style={{ maxWidth: "700px", borderRadius: "16px", background: "#fff" }}
    >
      <div className="card-body">
        <h2 className="mb-4 text-center fw-bold" style={{ color: "#222" }}>
          My Orders
        </h2>
        {orders.length === 0 ? (
          <div className="text-center text-muted">No orders found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <ul className="list-unstyled mb-0">
                        {order.items.map((item) => (
                          <li key={item.productId}>
                            {item.name} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>₹{order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
