import React from 'react';
const ProductCard = ({ product }) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        {product.discount && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
            {product.discount}% OFF
          </span>
        )}
        <img
          className="w-full h-48 object-cover"
          src={product.image}
        //   alt={product.name}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          <span className="flex items-center">
            {Array(product.rating)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.93 5.755 1.4 8.162-7.338-3.859L5.662 23.127l1.4-8.162-5.93-5.755 8.2-1.192L12 .587z" />
                </svg>
              ))}
          </span>
        </div>
        <button className="mt-4 w-full bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-300 transition duration-300">
          Add to Cart
        </button>
      </div>

    </div>
    
  );
};

export default ProductCard;
