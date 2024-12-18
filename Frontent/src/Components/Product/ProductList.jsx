import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/products/getallproducts",
          { withCredentials: true }
        );
        setProducts(response.data.data); // data.data is an array
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch products.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isShowingAll = visibleCount >= filteredProducts.length;

  const toggleViewAll = () => {
    setVisibleCount(isShowingAll ? 4 : filteredProducts.length);
  };

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>No products found.</div>;

  return (
    <div className="px-6 py-10 min-h-[250px]">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <form className="flex items-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <input
            className="w-[80%] sm:w-full px-4 py-2 text-sm md:text-base bg-white border border-blue-200 rounded-l-full outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition duration-200 ease-in-out shadow-sm"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
