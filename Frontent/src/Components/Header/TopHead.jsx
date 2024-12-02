import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaUserShield,
  FaSignInAlt,
} from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

function TopHead() {
  return (
    <>
      <div>
        {/* Top Announcement Bar */}
        <div className="w-full h-[45px] bg-gradient-to-r from-teal-500 to-cyan-500 flex justify-center items-center text-white">
          <h2 className="marquee-container text-xs sm:text-sm md:text-base uppercase tracking-wide">
            <span className="font-semibold text-yellow-300 mr-2">
              Free Shipping:
            </span>
            This Week Only – Orders Over ₹2.5 Lakh!
          </h2>
        </div>

        {/* Main Header Section */}
        <div className="w-full py-4 sm:py-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center bg-gray-50 px-4 sm:px-8 md:px-12">
          {/* Logo Section */}
          <div className="flex items-center justify-center sm:justify-start w-full sm:w-1/3">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 font-bold text-2xl md:text-3xl">
              VendorMart
            </h1>
          </div>

          {/* User, Cart, Admin, and GitHub Icons */}
          <div className="flex items-center justify-center sm:justify-end w-full sm:w-1/3 mt-4 sm:mt-0 space-x-4 text-lg text-gray-600">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-gray-700"
              }
            >
              <FaUser className="cursor-pointer hover:text-indigo-600 transition-colors duration-200" />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-gray-700"
              }
            >
              <FaShoppingCart className="cursor-pointer hover:text-indigo-600 transition-colors duration-200" />
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-gray-700"
              }
            >
              <FaSignInAlt className="cursor-pointer hover:text-indigo-600 transition-colors duration-200" />
            </NavLink>
            <BsGithub className="cursor-pointer hover:text-indigo-600 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TopHead;
