
import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";


const CartPage = () => {
  const { cart, setCart } = useCart();
  const getTotal = () => cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

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
                <span>{cart.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Total Amount:</span>
                <span>₹{getTotal()}</span>
              </div>
              <button className="btn btn-primary w-100 mt-3" disabled={cart.length === 0}>
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
