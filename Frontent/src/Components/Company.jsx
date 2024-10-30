import React from 'react';

function Company() {
  const list = [
    {
      Name: "https://pdimg.pricedekho.com/brand/samsung.jpg",
      Color: "",
      title: "Samsung",
    },
    {
      Name: "https://pdimg.pricedekho.com/brand/xiaomi.jpg",
      Color: "",
      title: "Xiaomi",
    },
    {
      Name: "https://pdimg.pricedekho.com/brand/apple.jpg",
      Color: "",
      title: "Apple",
    },
    {
      Name: "https://pdimg.pricedekho.com/brand/oneplus.jpg",
      Color: "",
      title: "Oneplus",
    },
    {
      Name: "https://pdimg.pricedekho.com/brand/oppo.jpg",
      Color: "",
      title: "Oppo",
    },
    {
      Name: "https://pdimg.pricedekho.com/brand/vivo.jpg",
      Color: "",
      title: "Vivo",
    },
    {
      Name: "https://pdimg.pricedekho.com/brand/realme.jpg",
      Color: "",
      title: "Realme",
    },
    {
      Name: "https://pdimg.pricedekho.com/brand/lg.jpg",
      Color: "",
      title: "LG",
    },
  ];

  return (
    <div className="w-full flex justify-center items-center mt-5 ">
      <div className="w-[90%] shadow-lg bg-white rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="border-b border-gray-300 p-5 ">
          <h1 className="font-medium text-2xl antialiased text-gray-800 ">
            Our Top Brands...
          </h1>

          {/* Responsive Grid: Stack on mobile, horizontal on larger screens */}
          <div className="flex flex-wrap sm:flex-nowrap justify-evenly w-full h-auto sm:h-[200px] items-center">
            {list.map((item, index) => (
              <div key={index} className="flex flex-col items-center mb-4 sm:mb-0">
                {/* Brand Card */}
                <span
                  className="h-[100px] w-[120px] sm:h-[135px] sm:w-[170px] flex justify-center items-center bg-white border border-gray-300 rounded-2xl cursor-pointer shadow-lg transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src={item.Name}
                    alt={item.title}
                    className="w-full h-full object-contain p-2"
                  />
                </span>
                {/* Title below the icon */}
                <h3 className="text-sm sm:text-base text-center mt-2 font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition duration-200">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-medium p-4 text-blue-500 cursor-pointer hover:underline hover:text-blue-600 transition duration-200">
          View All
        </h2>
      </div>
    </div>
  );
}

export default Company;
