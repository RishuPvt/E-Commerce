import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function MidHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const list = [
    { Name: "Home", path: "/" },
    { Name: "Category", path: "/Category" },
    { Name: "Hot Offers", path: "/Offers" },
    { Name: "About", path: "/About" },
  ];

  return (
    <div className="shadow-lg bg-white w-full">
      {/* Top header */}
      <div className="flex justify-between items-center px-4 py-3 md:px-8 lg:px-12">
        {/* Brand Logo */}
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <a href="/">BrandLogo</a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none text-indigo-500"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium uppercase text-sm lg:text-base text-gray-700">
          {list.map((item, index) => (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "text-gray-700"
              }
            >
              {" "}
              <li
                className="p-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300 rounded-md"
                key={index}
              >
                {item.Name}
              </li>{" "}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col md:hidden items-center bg-gradient-to-b from-gray-50 to-indigo-100 py-4 space-y-2 w-full shadow-inner">
          {list.map((item, index) => (
            <li
              className="py-2 text-indigo-600 text-lg cursor-pointer hover:bg-indigo-200 transition-all duration-300 w-full text-center"
              key={index}
            >
              {item.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MidHeader;
