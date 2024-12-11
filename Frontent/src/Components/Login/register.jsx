import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    fullName: "",
    address: "",
    password: "",
    email: "",
    avatar: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const form = new FormData();
      form.append("username", formData.username);
      form.append("phone", formData.phone);
      form.append("fullName", formData.fullName);
      form.append("address", formData.address);
      form.append("password", formData.password);
      form.append("email", formData.email);
      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        form,
        config
      );

      setMessage(response.data.message || "User registered successfully!");
      setLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to register. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
        Create Your Account
        </h2>
        {error && <p className="text-red-500 bg-red-100 border border-red-500 rounded p-3 mb-4">{error}</p>}
        {message && <p className="text-green-500 bg-green-100 border border-green-500 rounded p-3 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
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
          <NavLink to="/login"
            className="text-teal-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
