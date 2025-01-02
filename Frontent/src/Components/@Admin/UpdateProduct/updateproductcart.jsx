import React, { useState } from "react";
import { Link } from "react-router-dom";

const UpdateProductCard = ({ product }) => {
  //console.log(product, "this is product");


  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        {/* Product Image */}
        <img
          className="w-full h-56 object-cover"
          src={product?.imageUrl || "demo"}
          alt={product?.name || "demo image"}
        />
      </div>
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product?.name || "product name"}
        </h3>
        {/* Product Description */}
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {product?.description || "description"}
        </p>
        {/* Product Details */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">Brand:</span>{" "}
            {product?.brand || "brand"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">Category:</span>{" "}
            {product?.category || "categpry"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">Stock:</span>{" "}
            {product.stock > 0 ? product.stock : "Out of Stock"}
          </p>
        </div>
        {/* Price and Rating */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-teal-600">
            ${product.price}
          </span>
        </div>

        {/* Action Button */}
        <Link to={`/update-field/${product._id}`}>
          <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold py-2 rounded-lg hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 ease-in-out shadow-md">
            Update Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UpdateProductCard;
