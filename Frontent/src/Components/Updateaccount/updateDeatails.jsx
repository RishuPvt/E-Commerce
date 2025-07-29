import React, { useState } from "react";
import { useNavigate , NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { backebdUrl } from "../../Api";
import axiosinstance from "../axios/axiosinstance";
function UpdateDetails() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(name + "  " + value);

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      console.log("final form data send " + formData);

      const response = await axiosinstance.patch(
        `${backebdUrl}/users/update-account`, // API endpoint for login
        formData,
        config
      );
      if (response.status === 200) {
        toast.success(
          response.data.message || "Account details updated successfully"
        );
        navigate("/profile"); // Navigate to the dashboard or target page
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to  updated Account details . Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Account Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Full Name */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              name="fullName"
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              name="phone"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              name="address"
              id="address"
              type="text"
              onChange={handleInputChange}
              value={formData.address}
              placeholder="Enter your address"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              {loading ? "Updating..." : "Update Details"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-base text-gray-600">
         Update Avatar{" "}
          <NavLink
            to="/update-UserAvatar"
            className="text-indigo-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
          >
            Change Avatar
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default UpdateDetails;
