import React from "react";
import banner from "../../assets/banner-1.png";
import banner3 from "../../assets/banner-3.png";
import banner2 from "../../assets/banner-2.png";

function LowerHeader() {
  const list = [
    { Name: banner },
    { Name: banner2 },
    { Name: banner3 },
  ];

  return (
    <>
      <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[512px] flex justify-center items-center">
        {/* Main container with hidden overflow and scroll on hover */}
        <div className="scrollbar-hide w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] h-full flex overflow-hidden hover:overflow-x-scroll snap-x snap-mandatory scrollbar-none scroll-smooth">
          {/* Mapping through the images */}
          {list.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 snap-center"
              >
                <img
                  src={item.Name}
                  alt="Offers"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default LowerHeader;
