import React from "react";
import banner from "../../assets/banner-1.png";
import banner2 from "../../assets/banner-2.png";
import banner3 from "../../assets/banner-3.png";

function LowerHeader() {
  const list = [
    {
      image: banner,
      offerText: "50% OFF on Electronics",
      description: "Get the best deals on top brands",
      styleClass: "offer-style-1",
    },
    {
      image: banner2,
      offerText: "Buy 1 Get 1 Free!",
      description: "Exclusive offer on selected items",
      styleClass: "offer-style-2",
    },
    {
      image: banner3,
      offerText: "Summer Sale: Up to 70% OFF",
      description: "Biggest savings on all summer items",
      styleClass: "offer-style-3",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center mt-6">
      <div className="relative w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[512px]">
        <div className="hide-scrollbar flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory w-full h-full">
          {list.map((item, index) => (
            <div
              key={index}
              className="relative w-full h-full flex-shrink-0 snap-center transition-transform duration-300"
            >
              <img
                src={item.image}
                alt="Offer"
                className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
              {/* Offer text container with styling */}
              <div
                className={`absolute top-1/4 left-4 p-4  rounded-lg max-w-[50%] ${item.styleClass}`}
              >
                <h2 className="text-3xl font-extrabold font-sans mb-1">
                  {item.offerText}
                </h2>
                <p className="text-lg font-medium opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all"
          onClick={() =>
            document
              .querySelector(".hide-scrollbar")
              .scrollBy({ left: -300, behavior: "smooth" })
          }
        >
          {"<"}
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all"
          onClick={() =>
            document
              .querySelector(".hide-scrollbar")
              .scrollBy({ left: 300, behavior: "smooth" })
          }
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default LowerHeader;
