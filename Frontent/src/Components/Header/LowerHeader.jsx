import React from "react";
import banner from "../../assets/banner-1.png";
import banner2 from "../../assets/banner-2.png";
import banner3 from "../../assets/banner-3.png";

function LowerHeader() {
  const list = [
    { Name: banner },
    { Name: banner2 },
    { Name: banner3 },
  ];
  

  return (
    <>
      <div className="w-full flex justify-center items-center mt-6">
        {/* Responsive banner container */}
        <div className="relative w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[512px]">
          {/* Main banner section with smooth horizontal scroll and hidden scrollbar */}
          <div className="hide-scrollbar flex overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory w-full h-full">
            {list.map((item, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 snap-center transition-transform duration-300"
              >
                <img
                  src={item.Name}
                  alt="Offer"
                  className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Left and right scroll buttons */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() =>
              document.querySelector(".hide-scrollbar").scrollBy({ left: -300, behavior: "smooth" })
            }
          >
            {"<"}
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() =>
              document.querySelector(".hide-scrollbar").scrollBy({ left: 300, behavior: "smooth" })
            }
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}

export default LowerHeader;
