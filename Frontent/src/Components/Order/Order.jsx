import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
 import { useCartContext } from "../../context/Caetcontext";
 import { backebdUrl } from "../../Api";
const PlaceOrder = () => {
    const {amount} = useParams()
  const [orderDetails, setOrderDetails] = useState({
    totalAmount: amount,
    shippingAddress: "",
    paymentMethod: "",
  });
  
  const [loading, setLoading] = useState(false);
   const {cartId : cartIdcontext}=useCartContext();
   
const Navigate=useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${backebdUrl}/order/createOrder/${cartIdcontext.cartId}`,
        orderDetails,
        {
          withCredentials: true,
          "Content-Type": "multipart/form-data",
        }
      );
      console.log(response);

      if (response.status === 201) {

        toast.success(response.data.message || "order Placed successful!");
        Navigate("/")
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Failed to place the order.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Place Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            disabled
            value={orderDetails.totalAmount}
            onChange={handleInputChange}
            placeholder="Enter total amount"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Shipping Address */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Shipping Address
          </label>
          <input
            type="text"
            name="shippingAddress"
            value={orderDetails.shippingAddress}
            onChange={handleInputChange}
            placeholder="Enter shipping address"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={orderDetails.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
