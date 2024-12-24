import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import  {NavLink} from "react-router-dom"
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(
      1,
      Math.min(product.stock, parseInt(e.target.value) || 1)
    );
    setQuantity(value);
  };

  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/Cart/add-Cart/675c8b92d4cf59647c154a5c",
        {
          productId: product._id, // Send the product ID
          quantity,
        },
        {
          withCredentials: true,
        }
      );

      // console.log( product.id ,quantity );

      if (response.status === 200) {
        toast.success("Product added to cart!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to added to cart. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
      <NavLink to="/productpage" >
      <div className="relative">
        {/* Discount Badge */}
        {product.discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md z-10">
            {product.discountPercentage}% OFF
          </span>
        )}
        {/* Product Image */}
        <img
          className="w-full h-56 object-cover"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      </NavLink>
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        {/* Product Description */}
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        {/* Product Details */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">Brand:</span>{" "}
            {product.brand}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">Category:</span>{" "}
            {product.category}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-800">Stock:</span>{" "}
            {product.stock > 0 ? product.stock : "Out of Stock"}
          </p>
        </div>
        {/* Price and Rating */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-teal-600">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center">
            {/* Render Stars */}
            {Array.from({ length: Math.round(product.rating) }, (_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.6 4.92 5.164.008c.96.002 1.358 1.238.588 1.81l-4.118 2.995 1.562 4.98c.285.909-.755 1.64-1.54 1.102L10 14.712l-4.207 3.03c-.785.538-1.825-.193-1.54-1.102l1.562-4.98-4.118-2.995c-.77-.572-.372-1.808.588-1.81l5.164-.008 1.6-4.92z" />
              </svg>
            ))}
          </div>
        </div>
        {/* Quantity Selector */}
        <div className="mt-4 flex items-center justify-between">
          <label
            htmlFor="quantity"
            className="text-sm font-medium text-gray-700"
          >
            Quantity:
          </label>
          <input
            name="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            min="1"
            max={product.stock}
          />
        </div>
        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold py-2 rounded-lg hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 ease-in-out shadow-md"
          disabled={product.stock === 0}
        >
          {loading ? "Adding..." : `Add ${quantity} to Cart`}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
