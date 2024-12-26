import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { use } from "react";
import toast from "react-hot-toast";
import { backebdUrl } from "../../Api";
function Chngpassword() {
  const [FormData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
      };

      // Send plain JSON data instead of FormData
      const response = await axios.post(
        "backebdUrl/users/change-password",
        {
          oldPassword: FormData.oldPassword,
          newPassword: FormData.newPassword,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        },
        config
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Password changed successfully");
        navigate("/profile"); // Navigate to the dashboard or target page
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to change Password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Change Password
          </h2>
          <form method="post" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                onChange={handleInputChange}
                value={FormData.oldPassword}
                placeholder="Enter Old Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                onChange={handleInputChange}
                value={FormData.newPassword}
                placeholder="Enter New Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                {loading ? "Updating..." : "Update password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chngpassword;
