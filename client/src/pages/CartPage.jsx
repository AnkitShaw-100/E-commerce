
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";


const CartPage = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const PLATFORM_FEE = 30;
  const DELIVERY_CHARGE = 50;
  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const getTotal = () => getSubtotal() + PLATFORM_FEE + DELIVERY_CHARGE;

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item =>
      item._id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
        : item
    ));
  };

  return (
    <Layout title={"Cart - E-commerce App"}>
      <div className="container mt-3">
        <h1 className="text-center">Cart</h1>
        <div className="row">
          <div className="col-md-8">
            {cart.length === 0 ? (
              <p>Your shopping cart is currently empty.</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div key={item._id} className="card mb-3">
                    <div className="row g-0 align-items-center">
                      <div className="col-md-3">
                        <img
                          src={item.photo && item.photo.data ? URL.createObjectURL(new Blob([new Uint8Array(item.photo.data.data)], { type: item.photo.contentType })) : 'https://via.placeholder.com/300x200?text=No+Image'}
                          alt={item.name}
                          className="img-fluid rounded-start"
                          style={{ maxHeight: 120, objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-9">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text mb-1">{item.description}</p>
                            <p className="card-text mb-1">Category: {item.category?.name || '-'}</p>
                            <p className="card-text mb-1">Price: ₹{item.price}</p>
                            <p className="card-text mb-1">Shipping: {item.shipping ? 'Available' : 'No Shipping'}</p>
                            <div className="d-flex align-items-center mt-2">
                              <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => updateQuantity(item._id, -1)}>-</button>
                              <span style={{ minWidth: 30, textAlign: 'center' }}>{item.quantity || 1}</span>
                              <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => updateQuantity(item._id, 1)}>+</button>
                            </div>
                          </div>
                          <button
                            className="btn btn-danger btn-sm ms-3"
                            onClick={() => setCart(cart.filter((c) => c._id !== item._id))}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h4>Bill Details</h4>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Total Items:</span>
                <span>{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
              </div>
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
              <button
                className="btn btn-primary w-100 mt-3"
                disabled={cart.length === 0}
                onClick={() => navigate('/payment')}
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
