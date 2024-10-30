import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import TopHead from "../Header/TopHead";
import MidHeader from "../Header/MidHeader";

const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <TopHead />
      <MidHeader />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <p className="text-gray-700 text-center text-lg">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-300 mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                        className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 rounded-l-md transition"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                        className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 rounded-r-md transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Item */}
                    <button onClick={() => onRemoveItem(item)} className="text-red-500 hover:text-red-700 transition">
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-800 font-semibold">${calculateTotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Shipping</span>
                <span className="text-gray-800 font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <span className="text-xl font-semibold text-gray-800">Total</span>
                <span className="text-xl font-semibold text-gray-800">${calculateTotal()}</span>
              </div>
              <button
                className="mt-8 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage of the CartPage with sample cart items
const App = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 49.99, quantity: 1, image: "https://example.com/headphones.jpg" },
    { id: 2, name: "Smart Watch", price: 119.99, quantity: 1, image: "https://example.com/smartwatch.jpg" },
  ]);

  const handleUpdateQuantity = (item, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, quantity } : i
      )
    );
  };

  const handleRemoveItem = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  return <CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />;
};

export default App;
