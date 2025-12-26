import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";

const CartPage = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const PLATFORM_FEE = 30;
  const DELIVERY_CHARGE = 50;

  const getSubtotal = () =>
    cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const getTotal = () =>
    // Only apply fees when there are items in the cart
    cart.length === 0 ? 0 : getSubtotal() + PLATFORM_FEE + DELIVERY_CHARGE;

  // Pagination for cart items (show 4 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(cart.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = cart.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    // If cart shrinks and currentPage is out of range, clamp it
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [cart.length, currentPage, totalPages]);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity || 1) + delta),
            }
          : item
      )
    );
  };

  return (
    <Layout title={"Cart - E-commerce App"}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-3xl font-bold mb-4">Your Cart</div>

        <div className="row g-4">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="col-md-8">
            {cart.length === 0 ? (
              <div className="text-center text-lg p-5 bg-slate-100 rounded-4 shadow-sm">
                <div>Your cart is empty</div>
                <p className="text-muted">
                  Add something cool. Your future self will thank you.
                </p>
              </div>
            ) : (
              visibleItems.map((item) => (
                <div
                  key={item._id}
                  className="card mb-3 border-0 shadow-sm rounded-4"
                  style={{ minHeight: 132 }}
                >
                  <div className="row g-3 align-items-center p-3">
                    {/* IMAGE */}
                    <div className="col-md-3">
                      <img
                        src={
                          item.photo?.data
                            ? URL.createObjectURL(
                                new Blob(
                                  [new Uint8Array(item.photo.data.data)],
                                  {
                                    type: item.photo.contentType,
                                  }
                                )
                              )
                            : "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        alt={item.name}
                        className="img-fluid rounded-3"
                        style={{
                          height: 132,
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="col-md-9">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-semibold mb-1">{item.name}</h6>

                          <p className="text-muted mb-1 small">
                            {item.category?.name || "—"}
                          </p>

                          <p className="fw-bold mb-2">₹{item.price}</p>

                          {/* QUANTITY CONTROLS */}
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="border border-black text-black bg-white px-2 py-1 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-50 transition"
                              onClick={() => updateQuantity(item._id, -1)}
                              style={{ minWidth: 32 }}
                            >
                              −
                            </button>

                            <span
                              className="fw-semibold mx-2"
                              style={{
                                minWidth: 24,
                                textAlign: "center",
                              }}
                            >
                              {item.quantity || 1}
                            </span>

                            <button
                              className="border border-black text-black bg-white px-2 py-1 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-50 transition"
                              onClick={() => updateQuantity(item._id, 1)}
                              style={{ minWidth: 32 }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* REMOVE */}
                        <button
                          className="bg-red-600 text-white border border-red-600 px-2 py-1 rounded-md text-sm font-semibold hover:bg-red-700 transition-shadow"
                          onClick={() =>
                            setCart(cart.filter((c) => c._id !== item._id))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Pagination controls - show when more than one page */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                <button
                  className="px-3 py-1 border rounded-md bg-white"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1 ? "bg-black text-white" : "bg-white"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="px-3 py-1 border rounded-md bg-white"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - BILL */}
          <div className="col-md-4">
            <div className="card border-0 shadow rounded-4 p-4">
              <h5 className="fw-bold mb-3">Price Details</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Items</span>
                <span>
                  {cart.reduce((sum, i) => sum + (i.quantity || 1), 0)}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>₹{getSubtotal()}</span>
              </div>

              {cart.length > 0 && (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Platform Fee</span>
                    <span>₹{PLATFORM_FEE}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Delivery</span>
                    <span>₹{DELIVERY_CHARGE}</span>
                  </div>
                </>
              )}

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>₹{getTotal()}</span>
              </div>

              <button
                className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-5 rounded-md text-base font-semibold cursor-pointer transition-all mt-4 uppercase tracking-wide shadow-md w-full hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                disabled={cart.length === 0}
                onClick={() => navigate("/payment")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
