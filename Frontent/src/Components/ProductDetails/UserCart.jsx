import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import TopHead from "../Header/TopHead";
import MidHeader from "../Header/MidHeader";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const CartPage = ({ cartItems, onRemoveItem, onUpdateQuantity  }) => {
  //const [totalamount,setTotalamount] = useState();
  const calculateTotal = () =>{
  const amount =   cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    )
    //setTotalamount(amount)
  return amount;
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <TopHead />
      <MidHeader />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <AiOutlineShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 text-lg">Your cart is empty</p>
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              onClick={() => window.location.replace("/")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-300 mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-medium text-gray-800">
                        {item.productId.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Price: ${item.productId.price}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item._id, item.quantity - 1, 1)
                          }
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => onUpdateQuantity(item._id)}
                          className="w-12 text-center border border-gray-300 rounded"
                        />
                        <button
                          onClick={() =>
                            onUpdateQuantity(item._id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove item"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-800 font-semibold">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Shipping</span>
                <span className="text-gray-800 font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <span className="text-xl font-semibold text-gray-800">
                  Total
                </span>
                <span className="text-xl font-semibold text-gray-800">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <NavLink to={`/order/${calculateTotal()}`}>
              <button className="mt-8 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition duration-200">
                Proceed to Checkout
              </button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// usage of the CartPage with sample cart items
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetchCart fucntion for user getCart
  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/v1/Cart/getCart/675c8b92d4cf59647c154a5c",
        {
          withCredentials: true,
        }
      );

      setCartItems(response.data.data[0].items);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch cart. Please log in.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // handleDelete fucntion for user delete cart
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/v1/Cart/deleteCart/${id}`, {
        withCredentials: true,
      });
      toast.success("Cart item deleted successfully!");
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete cart item.";
      toast.error(errorMessage);
    }
  };

  // handleUpdateQuantity fucntion for user to update cart
  const handleUpdateQuantity = async (id, quantity ,userId) => {
    try {
      await axios.put(
        `http://localhost:7000/api/v1/Cart/updateCartItem/675c8b92d4cf59647c154a5c/item/${id}`,
        { quantity },
        {
          withCredentials: true,
        }
      );
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update quantity.";
      toast.error(errorMessage);
    }
  };

  if (loading) return <div className="text-center py-10">Loading cart...</div>;

  return (
    <CartPage
      cartItems={cartItems}
      onRemoveItem={handleDelete}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );
};

export default App;
