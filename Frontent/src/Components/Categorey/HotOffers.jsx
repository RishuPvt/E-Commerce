import React from 'react';
import { FaTag } from 'react-icons/fa';
import TopHead from "../Header/TopHead";
import MidHeader from "../Header/MidHeader";

const hotOffers = [
  { id: 1, name: 'Gaming Laptop', image: 'https://example.com/gaming-laptop.jpg', originalPrice: 1200, discountedPrice: 999, discount: '20%' },
  { id: 2, name: 'Smartphone X', image: 'https://example.com/smartphone-x.jpg', originalPrice: 800, discountedPrice: 599, discount: '25%' },
  { id: 3, name: 'Noise-Cancelling Headphones', image: 'https://example.com/headphones.jpg', originalPrice: 300, discountedPrice: 199, discount: '33%' },
  { id: 4, name: '4K Smart TV', image: 'https://example.com/smart-tv.jpg', originalPrice: 1500, discountedPrice: 1299, discount: '13%' },
  { id: 5, name: 'Smartwatch Pro', image: 'https://example.com/smartwatch.jpg', originalPrice: 400, discountedPrice: 299, discount: '25%' },
  { id: 6, name: 'Wireless Gaming Mouse', image: 'https://example.com/gaming-mouse.jpg', originalPrice: 80, discountedPrice: 59, discount: '26%' },
];

const HotOffersPage = () => {
  return (
    <div className=''>
         <TopHead />
         <MidHeader />
    <div className="bg-gray-50 min-h-screen px-6 py-10">
     

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Hot Offers</h1>
        <p className="text-gray-600 mb-8">Grab the best deals on top electronics!</p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {hotOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 p-4 relative border-t-4 border-green-500"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={offer.image}
                alt={offer.name}
                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
              />
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {offer.discount}
              </span>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">{offer.name}</h2>
              <p className="text-gray-600 text-sm line-through">${offer.originalPrice}</p>
              <p className="text-xl font-bold text-gray-800">${offer.discountedPrice}</p>
              <button className="w-full mt-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 shadow-md hover:shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default HotOffersPage;
