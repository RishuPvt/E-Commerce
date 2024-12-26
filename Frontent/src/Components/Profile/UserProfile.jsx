import React, { useState } from "react";
import { FaUserEdit, FaShoppingBag, FaSignOutAlt, FaKey } from "react-icons/fa";
import TopHead from "../Header/TopHead";
import MidHeader from "../Header/MidHeader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { useUserContext } from "../../context/Usercontext";
import { backebdUrl } from "../../Api";
const UserProfile = () => {
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [order, setorder] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${backebdUrl}/users/current-user`,
          {
            withCredentials: true,
          }
        );
        // console.log(response.data);

        setUser(response.data.data); //backend sends a `user` object in the response
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Please Logged in..";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    const fetchorder = async () => {
      try {
        const response = await axios.get(
          `${backebdUrl}/order/getOrderHistory`,
          { withCredentials: true }
        );
        setorder(response.data.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "";
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchorder();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(false);

    try {
      const response = await axios.post(
        `${backebdUrl}/users/logout`,
        {},
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      toast.success(response.data.message || "User logout successful!");
      navigate("/login"); // Navigate to the dashboard or target page
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to logout. Please try again."
      );
      setError(error.response?.data?.message || "Unknown error occurred");
    } finally {
      // Reset loading state
      setLoading(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <TopHead />
      <MidHeader />
      <div className="container mx-auto px-4 py-10">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-8 mb-10 transition-transform duration-300 hover:scale-105">
          <div className="flex flex-col items-center md:items-start md:w-1/4 mb-6 md:mb-0">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-300"
            />
            <Link to="/update-account">
              <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition duration-200 flex items-center">
                <FaUserEdit className="mr-2" /> Edit Profile
              </button>
            </Link>
          </div>

          <div className="md:w-3/4 md:pl-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {user.fullName}
            </h2>
            <p className="text-gray-500 text-lg">@{user.username}</p>
            <div className="mt-6 text-gray-700 space-y-3">
              <p>
                <span className="font-semibold text-blue-700">Address:</span>{" "}
                {user.address}
              </p>
              <p>
                <span className="font-semibold text-blue-700">Email:</span>{" "}
                {user.email}
              </p>
            </div>

            {/* Change Password and Logout Buttons */}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-5 py-2 bg-red-500 text-white rounded-full font-medium shadow-md hover:bg-red-600 transition duration-200 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />{" "}
                {loading ? "Logging Out..." : "LogOut"}
              </button>
              <Link to="/change-password">
                <button className="px-5 py-2 bg-yellow-500 text-white rounded-full font-medium shadow-md hover:bg-yellow-600 transition duration-200 flex items-center">
                  <FaKey className="mr-2" /> Change Password
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Shopping History Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl rounded-lg p-8 transition-transform duration-300 hover:scale-105">
          <h3 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
            Shopping History
          </h3>
          {order.length === 0 ? (
            <p className="text-gray-700 text-lg text-center">
              No purchases yet.
            </p>
          ) : (
            <div className="space-y-6">
              {order.map((order, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-2xl font-semibold text-indigo-800">
                        {order.shippingAddress}
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-green-500 font-bold text-xl">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700">
                      <strong>Payment Status:</strong> {order.paymentStatus}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <strong>Order Status:</strong> {order.orderStatus}
                    </p>
    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
