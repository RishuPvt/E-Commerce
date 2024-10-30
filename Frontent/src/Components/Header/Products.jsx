import React from 'react';

function Products() {
  const list = [
    {
      Name: "https://pdimg.pricedekho.com/category/mobiles.svg",
      Color: "#ff66b2", // Light Pink
      title: "Mobile",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/laptops.svg",
      Color: "#4db8ff", // Sky Blue
      title: "Laptops",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/air-conditioners.svg",
      Color: "#66cc66", // Light Green
      title: "Air Conditioners",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/refrigerators.svg",
      Color: "#3399ff", // Medium Blue
      title: "Refrigerator",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/televisions.svg",
      Color: "#ff99cc", // Light Pink
      title: "Televisions",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/washing-machines-dryers.svg",
      Color: "#33cc99", // Teal
      title: "Washing Machines",
    },
    {
      Name: "https://pdimg.pricedekho.com/category/cameras.svg",
      Color: "#ff944d", // Light Orange
      title: "Camera",
    },
  ];

  return (
    <>
      <div className="w-full flex justify-center items-center mt-[15px]">
        <div className="w-[90%] shadow-lg bg-white rounded-lg p-4 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="border-b border-gray-300 pb-3 mb-3">
            <h1 className="font-semibold text-2xl text-gray-800 text-center sm:text-left">
              What do you want to buy today?
            </h1>

            {/* Responsive Grid: Stack on mobile, horizontal on larger screens */}
            <div className="flex flex-wrap sm:flex-nowrap justify-evenly w-full h-auto sm:h-[200px] items-center mt-4">
              {list.map((item, index) => (
                <div key={index} className="flex flex-col items-center mb-4 sm:mb-0">
                  {/* Adjust the size for mobile using responsive classes */}
                  <span
                    className="h-[100px] w-[120px] sm:h-[135px] sm:w-[170px] flex justify-center items-center bg-opacity-80 rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                    style={{ backgroundColor: item.Color }}
                  >
                    <img
                      src={item.Name}
                      alt="Items"
                      className="w-[40px] h-[40px] sm:w-[57px] sm:h-[57px]"
                    />
                  </span>
                  {/* Title below the icon */}
                  <h3 className="text-sm sm:text-base text-center mt-[7px] font-medium text-gray-700">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-medium p-[10px] text-center sm:text-left cursor-pointer text-indigo-600 hover:underline hover:text-indigo-700 transition-colors duration-200">
            View All
          </h2>
        </div>
      </div>
    </>
  );
}

export default Products;
