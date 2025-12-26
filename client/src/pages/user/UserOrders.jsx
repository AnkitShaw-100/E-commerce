import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

const statusClass = (s) => {
  if (!s) return "bg-gray-100 text-gray-700";
  const key = s.toString().toLowerCase();
  if (key.includes("pending")) return "bg-yellow-100 text-yellow-800";
  if (key.includes("paid") || key.includes("completed")) return "bg-green-100 text-green-800";
  if (key.includes("shipped") || key.includes("delivered")) return "bg-blue-100 text-blue-800";
  if (key.includes("cancel")) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-700";
};

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 7;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = auth?.token || (localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")).token : "");
        const { data } = await axios.get("/api/v1/order/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data.orders || []);
      } catch (err) {
        setOrders([]);
      }
    };
    if (auth?.token || localStorage.getItem("auth")) fetchOrders();
  }, [auth]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-8">You haven't placed any orders yet.</div>
      ) : (
        <>
        {/* Desktop / md+ table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Items</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Total</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage).map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{order.orderId}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <ul className="list-disc list-inside text-sm">
                      {(order.items || []).map((item, idx) => (
                        <li key={item.productId || item._id || idx} className="truncate max-w-xs">
                          {item.name} x{item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-semibold">₹{(parseFloat(order.total) || 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass(order.status)}`}>
                      {order.status || "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-4">
          {orders.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage).map((order) => (
            <div key={order._id} className="p-4 bg-white border rounded-lg shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                  <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">₹{(parseFloat(order.total) || 0).toFixed(2)}</div>
                  <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${statusClass(order.status)}`}>{order.status || '—'}</div>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-700">
                <div className="font-medium mb-1">Items</div>
                <ul className="list-disc list-inside space-y-1">
                  {(order.items || []).map((item, idx) => (
                    <li key={item.productId || item._id || idx} className="truncate">{item.name} x{item.quantity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {orders.length > perPage && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
            >Prev</button>

            {Array.from({ length: Math.ceil(orders.length / perPage) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-700'}`}
              >{i + 1}</button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(Math.ceil(orders.length / perPage), p + 1))}
              disabled={currentPage === Math.ceil(orders.length / perPage)}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
            >Next</button>
          </div>
        )}
        </>
      )}
    </div>
  );
};

export default UserOrders;
