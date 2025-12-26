import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 7;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token || "";

        const { data } = await axios.get("/api/v1/order/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data?.success) {
          setOrders(data.orders || []);
        } else {
          setError("Failed to load orders");
        }
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / perPage);
  const start = (currentPage - 1) * perPage;
  const pageOrders = orders.slice(start, start + perPage);

  return (
    <div className="bg-white rounded-xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>

      {loading ? (
        <div className="text-sm text-gray-500">Loading orders...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-sm text-gray-500">No orders found.</div>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Placed</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {pageOrders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{o.orderId}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">{o.user?.name || "—"}</div>
                      <div className="text-xs text-gray-500">
                        {o.user?.email || o.user?._id}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {o.items?.map((it) => (
                        <div key={it.productId} className="text-xs">
                          {it.name} × {it.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">₹{o.total}</td>
                    <td className="px-4 py-3 text-sm">{o.status}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">
            {pageOrders.map((o) => (
              <div key={o._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500">Order ID</span>
                  <span className="text-xs font-medium">{o.orderId}</span>
                </div>

                <div className="mb-2">
                  <p className="font-medium">{o.user?.name || "—"}</p>
                  <p className="text-xs text-gray-500">
                    {o.user?.email || o.user?._id}
                  </p>
                </div>

                <div className="mb-2 text-sm">
                  <p className="font-medium mb-1">Items</p>
                  {o.items?.map((it) => (
                    <p key={it.productId} className="text-xs text-gray-600">
                      {it.name} × {it.quantity}
                    </p>
                  ))}
                </div>

                <div className="flex justify-between text-sm mt-2">
                  <span>Total:</span>
                  <span className="font-semibold">₹{o.total}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Status: {o.status}</span>
                  <span>{new Date(o.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          {orders.length > perPage && (
            <div className="mt-6 flex justify-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminOrders;
