import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function MidHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const list = [
    { Name: "Home" },
    { Name: "Category" },
    { Name: "Hot Offers" },
    { Name: "Compare" },
  ];

  return (
    <div className="shadow-lg bg-white w-full">
      {/* Top header */}
      <div className="flex justify-between items-center px-4 py-3 md:px-8 lg:px-12">
        <div className="text-xl font-bold text-pink-600">
          <a href="/">BrandLogo</a>
        </div>

        <div className="md:hidden">
          {/* Hamburger icon */}
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium uppercase text-sm lg:text-base">
          {list.map((item, index) => (
            <li
              className="p-2 cursor-pointer hover:bg-gray-100 hover:text-pink-600 transition-colors duration-300 rounded-md"
              key={index}
            >
              {item.Name}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col md:hidden items-center bg-gray-100 py-4">
          {list.map((item, index) => (
            <li
              className="py-2 text-pink-600 text-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300 w-full text-center"
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
