import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { backebdUrl } from "../../Api";
const Register = () => {
  // State to manage the registration form data, loading state, success message, and error message
  const [formData, setFormData] = useState({
    username: "", // User's username
    phone: "", // User's phone number
    fullName: "", // User's full name
    address: "", // User's address
    password: "", // User's password
    email: "", // User's email
    avatar: null, // User's avatar (profile picture)
  });

  const [loading, setLoading] = useState(false); // Tracks loading state during form submission
  const [message, setMessage] = useState(null); // Success message after form submission
  const [error, setError] = useState(null); // Error message for failed submission
  const navigate = useNavigate();
  // Handles input changes for text fields and updates formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract input name and value
    setFormData({ ...formData, [name]: value }); // Update the corresponding field in formData
  };

  // Handles file input change for the avatar and updates formData state
  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] }); // Store the selected file in formData
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setLoading(true); // Set loading state to true
    setMessage(null); // Clear any previous success message
    setError(null); // Clear any previous error message

    try {
      // Set headers to indicate multipart/form-data content type
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Create a FormData object to handle file uploads and text data
      const form = new FormData();
      form.append("username", formData.username); // Add username to the form
      form.append("phone", formData.phone); // Add phone to the form
      form.append("fullName", formData.fullName); // Add fullName to the form
      form.append("address", formData.address); // Add address to the form
      form.append("password", formData.password); // Add password to the form
      form.append("email", formData.email); // Add email to the form

      // If an avatar is selected, append it to the form
      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }

      // Send a POST request to the backend API to register the user
      const response = await axios.post(
        `${backebdUrl}/users/register`, // API endpoint for user registration
        form, // Form data containing user details
        config // Configuration object with headers
      );

      if (response.status === 201) {
        toast.success(response.data.message || "User registered successful!");
        navigate("/login"); // Navigate to the dashboard or target page
      }
      // Set success message if the API call succeeds
      setMessage(response.data.message || "User registered successfully!");
      setLoading(false); // Set loading state to false after success
    } catch (error) {
      console.log(error);
      
      // Capture and display error message if the API call fails
      setError(
        error.response?.data?.message || "Failed to register. Please try again."
      );
      setLoading(false); // Set loading state to false after failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
          Create Your Account
        </h2>
        {error && (
          <p className="text-red-500 bg-red-100 border border-red-500 rounded p-3 mb-4">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-500 bg-green-100 border border-green-500 rounded p-3 mb-4">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="w-full p-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white font-semibold rounded-lg shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {/* Switch to Sign Up */}
        <p className="mt-6 text-center text-base text-gray-600">
          ALready have an account?{" "}
          <NavLink
            to="/login"
            className="text-teal-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
          >
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
