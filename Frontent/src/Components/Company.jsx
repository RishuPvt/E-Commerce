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
    <>
      <div className="w-full flex justify-center items-center mt-[15px]">
        <div className="w-[90%] shadow-lg">
          <div className="border-b border-gray-400">
            <h1 className="font-medium text-2xl antialiased p-[5px]">
              Our Top Brands...
            </h1>

            {/* Responsive Grid: Stack on mobile, horizontal on larger screens */}
            <div className="flex flex-wrap sm:flex-nowrap justify-evenly w-full h-auto sm:h-[200px] items-center">
              {list.map((item, index) => (
                <div key={index} className="flex flex-col items-center mb-4 sm:mb-0">
                  {/* Adjust the size for mobile using responsive classes */}
                  <span
                    className="h-[100px] w-[120px] sm:h-[135px] sm:w-[170px] flex justify-center items-center bg-white border border-gray-300 rounded-2xl"
                    style={{ backgroundColor: item.Color }}
                  >
                    <img
                      src={item.Name}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </span>
                  {/* Title below the icon */}
                  <h3 className="text-sm sm:text-base text-center mt-[7px] font-medium">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-medium p-[10px] text-center sm:text-left cursor-pointer hover:underline">
            View All
          </h2>
        </div>
      </div>
    </>
  );
}

export default Company;