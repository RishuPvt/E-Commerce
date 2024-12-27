import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/Usercontext";
import axios from "axios";
import { backebdUrl } from "../../Api";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [pin, setPin] = useState("");
  const [loading, setloading] = useState(false);
  const { user: userId } = useUserContext();
  console.log(userId, "this is user id");

  const navigate = useNavigate();

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await axios.post(
        `http//localhost:7000/api/v1/usersAdmin-pannel/675d1b3b5a63bca6189aade4`,
        {
          pin
        },
        {
          withCredentials: true,
        },
      );
      console.log(response?.data?.data);
      
      if (response.status === 200) {
        toast.success("Login Successful! Redirecting to Admin Panel...");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid PIN. Please try again.");
    }finally{
      setloading(false)
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

          {/* Login Button */}
          <button
  type="submit"
  className={`w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md font-semibold transition-all duration-300 ${
    loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-500 hover:to-indigo-500"
  }`}
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
