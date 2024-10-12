import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import MidHeader from "./MidHeader";
import LowerHeader from "./LowerHeader";
import Products from "./Products";
import Company from "../Company";
function TopHead() {
  return (
    <>
      <div className="">
    <div className="w-full h-[55px] border-b border-gray-400 flex justify-center items-center bg-black text-white">
        <div className="h-full flex justify-center items-center">
            <h2 className=" marquee-container  text-xs sm:text-sm md:text-base uppercase">
                <span className=" font-semibold text-pink-400 m-[4px]">Free Shipping</span>
                This Week Order Over - ₹2.5lakh
            </h2>
        </div>
    </div>

    <div className="w-full h-[115px] sm:h-[95px] border-b border-gray-400 flex flex-col sm:flex-row justify-center sm:justify-evenly items-center">
        <div className=" w-full sm:w-[40%] md:w-[20%] pl-1.5 flex items-center justify-center sm:justify-start">
            <h1 className="font-black text-base sm:text-lg md:text-3xl text-pink-600">VendorMart</h1>
        </div>
        <form className="w-full sm:w-[60%]  flex justify-center items-center mt-4 sm:mt-0">
            <input className="w-[80%] sm:w-[60%] h-[40px] border-pink-400 border-0 border-b-2 outline-none" type="text" id="input" placeholder="Enter Product Name..." />
            <FaSearch className="cursor-pointer ml-2 hover:text-pink-600" />
        </form>

        <div className="w-full sm:w-[20%] flex justify-center sm:justify-evenly items-center mt-4 sm:mt-0">
            <FaUser className="cursor-pointer mx-2 sm:mx-0 hover:text-pink-600" />
            <FaShoppingCart className="cursor-pointer mx-2 sm:mx-0 hover:text-pink-600" />
            <BsGithub className="cursor-pointer mx-2 sm:mx-0 hover:text-pink-600"/>
        </div>
    </div>
</div>
<MidHeader/>
<LowerHeader/>
<Products/>
<Company/>
    </>
  );
}

export default TopHead;
