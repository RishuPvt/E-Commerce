import React, { useState } from "react";

const AdminLogin = () => {
  const [pin, setPin] = useState(""); // State for the PIN input
  const [error, setError] = useState(""); // State for error messages

  // Simulated PIN for demonstration purposes
  const adminPin = "1234";

  const handlePinChange = (e) => {
    setPin(e.target.value);
    setError(""); // Clear error on input change
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === adminPin) {
      alert("Login Successful! Redirecting to Admin Panel...");
      // Add logic to navigate to the Admin Dashboard
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="w-[90%] sm:w-96 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your PIN to access the admin panel.
        </p>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          {/* PIN Input */}
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            placeholder="Enter PIN"
            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
