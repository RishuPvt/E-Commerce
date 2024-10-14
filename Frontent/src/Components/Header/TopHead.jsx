import React from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import MidHeader from "./MidHeader";
import LowerHeader from "./LowerHeader";
import Products from "./Products";
import Company from "../Company";

function TopHead() {
  return (
    <>
      <div className="">
        {/* Top Announcement Bar */}
        <div className="w-full h-[45px] bg-gradient-to-r from-pink-500 to-purple-500 flex justify-center items-center text-white">
          <h2 className="marquee-container text-xs sm:text-sm md:text-base uppercase tracking-wide">
            <span className="font-semibold text-yellow-300 mr-2">Free Shipping:</span>
            This Week Only – Orders Over ₹2.5 Lakh!
          </h2>
        </div>

        {/* Main Header Section */}
        <div className="w-full py-4 sm:py-6 border-b border-gray-300 flex flex-col sm:flex-row justify-between items-center bg-gray-50 px-4 sm:px-8 md:px-12">
          {/* Logo Section */}
          <div className="flex items-center justify-center sm:justify-start w-full sm:w-1/3">
            <h1 className="text-pink-600 font-bold text-xl md:text-3xl">
              VendorMart
            </h1>
          </div>

          {/* Search Bar */}
          <form className="flex items-center w-full sm:w-1/2 md:w-1/3 mt-4 sm:mt-0">
            <input
              className="w-[80%] sm:w-full px-4 py-2 border-b-2 border-pink-400 outline-none text-sm md:text-base bg-transparent"
              type="text"
              placeholder="Search for Products..."
            />
            <FaSearch className="ml-3 text-xl text-gray-600 cursor-pointer hover:text-pink-600 transition-colors duration-200" />
          </form>

          {/* User, Cart, and GitHub Icons */}
          <div className="flex items-center justify-center sm:justify-end w-full sm:w-1/3 mt-4 sm:mt-0 space-x-4 text-lg text-gray-600">
            <FaUser className="cursor-pointer hover:text-pink-600 transition-colors duration-200" />
            <FaShoppingCart className="cursor-pointer hover:text-pink-600 transition-colors duration-200" />
            <BsGithub className="cursor-pointer hover:text-pink-600 transition-colors duration-200" />
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <MidHeader />
      <LowerHeader />

      {/* Main Content */}
      <Products />
      <Company />
    </>
  );
}

export default TopHead;
