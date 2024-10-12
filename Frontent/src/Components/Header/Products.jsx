import React from 'react';

function Products() {
  const list = [
    {
      Name: "https://pdimg.pricedekho.com/category/mobiles.svg",
      Color: "#ff33cc",
      title: "Mobile",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/laptops.svg",
      Color: "#4da6ff",
      title: "Laptops",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/air-conditioners.svg",
      Color: "#70db70",
      title: "Air Conditioners",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/refrigerators.svg",
      Color: "#1a8cff",
      title: "Refrigerator",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/televisions.svg",
      Color: "#ff99cc",
      title: "Televisions",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/washing-machines-dryers.svg",
      Color: "#00ff55",
      title: "Washing Machines",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/cameras.svg",
      Color: "#ff751a",
      title: "Camera",
    },
  ];

  return (
    <>
      <div className="w-full flex justify-center items-center mt-[15px]">
        <div className="w-[90%] shadow-lg">
          <div className="border-b border-gray-400">
            <h1 className="font-medium text-2xl antialiased p-[5px]">
              What do you want to buy today?
            </h1>

            {/* Responsive Grid: Stack on mobile, horizontal on larger screens */}
            <div className="flex flex-wrap sm:flex-nowrap justify-evenly w-full h-auto sm:h-[200px] items-center">
              {list.map((item, index) => (
                <div key={index} className="flex flex-col items-center mb-4 sm:mb-0">
                  {/* Adjust the size for mobile using responsive classes */}
                  <span
                    className="h-[100px] w-[120px] sm:h-[135px] sm:w-[170px] flex justify-center items-center bg-white rounded-2xl"
                    style={{ backgroundColor: item.Color }}
                  >
                    <img
                      src={item.Name}
                      alt="Items"
                      className="w-[40px] h-[40px] sm:w-[57px] sm:h-[57px]"
                    />
                  </span>
                  {/* Title below the icon */}
                  <h3 className="text-sm sm:text-base text-center mt-[7px] font-medium">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-medium p-[10px] text-center sm:text-left cursor-pointer hover:underline">View All</h2>
        </div>
      </div>
    </>
  );
}

export default Products;
