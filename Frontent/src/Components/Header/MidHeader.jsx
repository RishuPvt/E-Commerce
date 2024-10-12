import React from 'react';

function MidHeader() {
  const list = [
    { Name: "Home" },
    { Name: "Category" },
    { Name: "Mens's" },
    { Name: "Women's" },
    { Name: "Perfume" },
    { Name: "Hot Offers" },
    { Name: "Compare" },

  ];

  return (
    <div className="shadow-lg">
      <div className="w-full ">
        <ul className="list-items flex flex-wrap items-center justify-center w-full">
          {list.map((item, index) => (
            <li
              className="p-2 sm:p-3.5 m-1 sm:m-1.5 cursor-pointer hover:bg-gray-200 hover:underline hover:text-pink-600 rounded-lg font-medium uppercase text-xs sm:text-sm lg:text-base transition duration-300 ease-in-out"
              key={index}
            >
              {item.Name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MidHeader;
