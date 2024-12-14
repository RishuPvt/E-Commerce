import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  // State to manage the login form data and loading status
  const [formData, setFormData] = useState({
    phone: "", // User's phone number
    password: "", // User's password
  });

  const [loading, setLoading] = useState(false); // Tracks whether the form submission is in progress
  const navigate = useNavigate(); // Hook for navigation

  // Handles changes in input fields and updates the corresponding field in formData
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract input field name and value
    setFormData({ ...formData, [name]: value }); // Update formData state with the new value
  };

  // Handles form submission for user login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true during the request

    try {
      // Send a POST request to the login API endpoint with form data
      const response = await axios.post(
        "http://localhost:7000/api/v1/users/login", // API endpoint for login
        formData, // Data to be sent in the request body
        { withCredentials: true } // Include credentials (cookies) in the request
      );

      if (response.status === 200) {
        // Display success toast
        // console.log(response?.data?.message)
        toast.success(response.data.message || "User login successful!");
        navigate("/"); // Navigate to the dashboard or target page
      }
    } catch (error) {
      // Capture and display the error message in a toast
      const errorMessage =
        error.response?.data?.message || "Failed to login. Please try again.";
      toast.error(errorMessage);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      {/* Login Card */}
      <div className="w-full max-w-md mt-10 p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
          Welcome Back
        </h2>
        <p className="text-base text-gray-500 text-center mb-6">
          Please enter your credentials to log in to your account.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-600 font-medium text-lg"
            >
              Phone No.
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium text-lg"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-500 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-teal-600 hover:shadow-xl transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Switch to Sign Up */}
        <p className="mt-6 text-center text-base text-gray-600">
          Don’t have an account?{" "}
          <NavLink
            to="/register"
            className="text-indigo-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
