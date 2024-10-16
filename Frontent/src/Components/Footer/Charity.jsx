import React from "react";
import delivery from "../../assets/delivery.png";
import percentage from "../../assets/percentage.png";
import year from "../../assets/year.png";
import replace from "../../assets/Replace.png";
import carity from "../../assets/Charity.png";

function Charity() {
  const list = [
    { name: delivery, title: "Free Shipping Over 5Lakh" },
    { name: year, title: "Two Year Warranty" },
    { name: replace, title: "Easy Returns" },
    { name: percentage, title: "1% Revenue to Charitable Initiatives" },

  ];

  return (
    <>
      <div className="py-12 px-6 md:px-16 bg-white">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
          OUR PROMISES
        </h1>

        {/* Icons Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-gradient-to-r from-pink-500 to-purple-500 p-8 rounded-xl shadow-lg mb-12">
          {list.map((item, index) => (
            <div
              className="flex flex-col items-center text-center"
              key={index}
            >
              <img
                className="w-20 h-20 md:w-28 md:h-28 mb-4"
                src={item.name}
                alt={item.title}
              />
              <p className="text-lg font-medium text-gray-700">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Charity Section */}
        <div className="flex flex-col md:flex-row items-center bg-gray-100 p-10 rounded-xl shadow-lg">
          <img
            className="w-full md:w-1/2 lg:w-[40%] h-auto object-cover rounded-lg mb-6 md:mb-0"
            src={carity}
            alt="Charity"
          />
          <div className="md:ml-10 text-center md:text-left">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Give Back With Us
            </h1>
            <p className="text-gray-600 leading-relaxed">
              We’re pledging 1% of all revenue to 4 partner charity
              organizations. You’ll be able to directly participate in this
              initiative at checkout, where you can choose which cause you'd
              like us to donate to!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Charity;
