import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backebdUrl } from "../../Api";
function ChangeAvatar() {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      if (!avatar) {
        toast.error("Please upload an avatar.");
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("avatar", avatar);
      //console.log(form);
      const response = await axios.patch(
        "backebdUrl/users/update-UserAvatar",
        form,
        config
      );
      if (response.statusCode === 200) {
        toast.success(
          response.data.message || "User Avatar Update successful!"
        );
        navigate("/"); // Navigate to the dashboard or target page
      }
      toast.success(response.data.message || "User Avatar Update successful!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to Update Avatar. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-xl max-w-md mx-auto border border-gray-200">
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Label for Avatar */}
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Upload Profile Picture
          </label>

          {/* File Input */}
          <input
            id="avatar"
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Updating..." : "Update Avatar"}
            </button>
          </div>
        </form>

        {/* Footer Text with NavLink */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Update Account Details{" "}
          <NavLink
            to="/update-account"
            className="text-indigo-500 font-semibold hover:underline hover:text-indigo-600 transition duration-200"
          >
            Update Account
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default ChangeAvatar;
