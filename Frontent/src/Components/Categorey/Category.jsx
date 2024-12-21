import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TopHead from "../Header/TopHead";
import MidHeader from "../Header/MidHeader";
import axios from "axios";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/products/getallproducts",
          {
            withCredentials: true,
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to fetch products. Please log in.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter categories to show only those with name "demo1" and matching the search query
  const filteredCategories = categories.filter(
    (category) =>
      category.category.toLowerCase() === "buds" &&
      category.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <TopHead />
      <MidHeader />
      <div className="bg-gray-50 min-h-screen px-6 py-10">
        {/* Title and Search */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Discover Electronics
          </h1>
          <p className="text-gray-600 mb-8">
            Explore the best in tech, from gadgets to gear.
          </p>
          <div className="flex justify-center">
            <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for demo1 categories..."
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-full outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300 shadow-md transition duration-300"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-r-full hover:bg-teal-600 transition-all duration-200">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredCategories.length === 0 ? (
            <p className="text-center col-span-4 text-gray-500">
              No categories found for "Electronics".
            </p>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 p-5 border-t-4 border-teal-500"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <p className="text-teal-600 font-medium mb-4">
                    Price: ${category.price}
                  </p>
                  <p className="text-gray-700 mb-4">Stock: {category.stock}</p>
                  <p className="text-gray-500 mb-4">Brand: {category.brand}</p>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg">
                    Shop Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
