import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { FaSearch } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality sound with noise cancellation.",
    price: 49.99,
    rating: 4,
    image: "https://example.com/headphones.jpg",
    discount: 20,
    brand: "Boat",
    category: "Audio",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "A stylish smartwatch with fitness tracking features.",
    price: 119.99,
    rating: 4,
    image: "https://example.com/smartwatch.jpg",
    brand: "FireBolt",
    category: "Audio",
  },
  {
    id: 3,
    name: " Watch",
    description: "A stylish smartwatch with fitness tracking features.",
    price: 119.99,
    rating: 3,
    image: "https://example.com/smartwatch.jpg",
    brand: "Sonata",
    category: "Audio",
  },
  {
    id: 4,
    name: "Camere",
    description: "A stylish smartwatch with fitness tracking features.",
    price: 119.99,
    rating: 3,
    image: "https://example.com/smartwatch.jpg",
    brand: "Sony",
    category: "Audio",
  },
  {
    id: 5,
    name: "Mobiles",
    description: "A stylish smartwatch with fitness tracking features.",
    price: 119.99,
    rating: 5,
    image: "https://example.com/smartwatch.jpg",
     brand: "Apples",
    category: "Audio",
  },
  {
    id: 6,
    name: "Fridge",
    description: "A stylish smartwatch with fitness tracking features.",
    price: 119.99,
    rating: 5,
    image: "https://example.com/smartwatch.jpg",
     brand: "Sony",
    category: "Whirlpool",
    discount: 20,
  },
  {
    id: 7,
    name: "TV",
    description: "A stylish smartwatch with fitness tracking features.",
    price: 119.99,
    rating: 5,
    image: "https://example.com/smartwatch.jpg",
     brand: "Samsung",
    category: "Audio",
  },
  {
    id: 8,
    name: "AC",
    description: "A stylish smartwatch with fitness tracking features.",
    price: 119.99,
    rating: 2,
    image: "https://example.com/smartwatch.jpg",
    brand: "Sony",
    category: "Audio",
    
  },
];

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const isShowingAll = visibleCount >= products.length;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleViewAll = () => {
    setVisibleCount(isShowingAll ? 4 : products.length);
  };

  return (
    <div className="px-6 py-10  min-h-[250px]">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <form className="flex items-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <input
            className="w-[80%] sm:w-full px-4 py-2 text-sm md:text-base bg-white border border-blue-200 rounded-l-full outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition duration-200 ease-in-out shadow-sm"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for Products..."
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-r-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 ease-in-out shadow-md"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View More / Show Less Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={toggleViewAll}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
        >
          {isShowingAll ? "Show Less" : "View All"}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
