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
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 md:pt-24 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center lg:text-left">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-gray-100 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">🛒</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Looks like you haven't added anything yet</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all font-semibold text-sm sm:text-base"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-3 sm:p-4 border border-gray-100"
                >
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-900 font-bold text-base sm:text-lg lg:text-xl mt-1">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-50 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition text-sm sm:text-base"
                        >
                          −
                        </button>
                        <span className="w-10 h-7 sm:w-12 sm:h-8 flex items-center justify-center font-semibold text-gray-900 bg-white border-x border-gray-200 text-sm sm:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition text-sm sm:text-base"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <FiTrash2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-500">Item Total:</span>
                    <span className="font-bold text-base sm:text-lg text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-100 p-4 sm:p-6 h-fit lg:sticky lg:top-8 mt-4 lg:mt-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Order Summary</h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center py-1 sm:py-2">
                  <span className="text-sm sm:text-base text-gray-600">Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}):</span>
                  <span className="font-semibold text-sm sm:text-base">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center py-1 sm:py-2">
                  <span className="text-sm sm:text-base text-gray-600">Delivery:</span>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">₹50</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center py-1 sm:py-2">
                  <span className="text-base sm:text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">₹{subtotal + 50}</span>
                </div>
              </div>

              <button className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base">
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
