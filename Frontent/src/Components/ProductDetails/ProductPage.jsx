import React, { useState } from 'react';
import { FaStar, FaCartPlus } from 'react-icons/fa';

const ProductPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Add functionality to handle adding to cart
  };

  const handleQuantityChange = (action) => {
    setQuantity((prev) => (action === 'increment' ? prev + 1 : Math.max(1, prev - 1)));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
          />
          <div className="flex space-x-2 justify-center">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition duration-200"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-green-700">${product.price}</span>
            <span className="ml-4 text-gray-700 flex items-center">
              {product.rating} <FaStar className="ml-1 text-yellow-500" />
            </span>
          </div>
          <p className="mb-6 text-gray-700 leading-relaxed">{product.description}</p>

          {/* Quantity Selection */}
          <div className="flex items-center mb-4">
            <label className="text-gray-600 mr-4">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange('decrement')}
                className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 rounded-l-md"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increment')}
                className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 rounded-r-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition duration-200"
          >
            <FaCartPlus className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
        <div>
          {product.reviews.map((review, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">{review.user}</span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
              <div className="flex mt-2">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <img src={relatedProduct.image} alt={relatedProduct.name} className="h-32 object-cover w-full rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{relatedProduct.name}</h3>
              <span className="text-gray-600">${relatedProduct.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Example usage with a product object
const product = {
  name: "Wireless Headphones",
  price: 49.99,
  description: "High-quality sound with noise cancellation and a comfortable fit.",
  rating: 4,
  images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ],
  reviews: [
    { user: "John Doe", date: "2024-09-15", comment: "Great sound quality!", rating: 5 },
    { user: "Jane Smith", date: "2024-09-16", comment: "Very comfortable to wear.", rating: 4 },
  ],
  relatedProducts: [
    { name: "Smart Watch", price: 119.99, image: "https://example.com/smartwatch.jpg" },
    { name: "Portable Charger", price: 29.99, image: "https://example.com/charger.jpg" },
    { name: "Wireless Earbuds", price: 39.99, image: "https://example.com/earbuds.jpg" },
  ],
};

const App = () => (
  <div>
    <ProductPage product={product} />
  </div>
);

export default App;
