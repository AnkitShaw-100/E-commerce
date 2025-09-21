import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Olive Oil",
      price: 499,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      price: 299,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300&q=80",
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything yet</p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-900 font-bold text-xl">
                        ₹{item.price}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-50 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition"
                        >
                          −
                        </button>
                        <span className="w-12 h-8 flex items-center justify-center font-semibold text-gray-900 bg-white border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Item Total */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Item Total:</span>
                    <span className="font-bold text-lg text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 h-fit sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}):</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-semibold text-gray-900">₹50</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-gray-900">₹{subtotal + 50}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                Proceed to Checkout
              </button>
              

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCart;
