import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import TopHead from "../Header/TopHead";
import MidHeader from "../Header/MidHeader";

const categories = [
  {
    id: 1,
    name: "Laptops",
    image: "https://example.com/laptop.jpg",
    description: "High-performance laptops for all your needs",
    brand: "Dell",
  },
  {
    id: 2,
    name: "Smartphones",
    image: "https://example.com/smartphone.jpg",
    description: "Latest smartphones with cutting-edge technology",
    brand: "Apple",
  },
  {
    id: 3,
    name: "Cameras",
    image: "https://example.com/camera.jpg",
    description: "Capture moments with high-quality cameras",
    brand: "Canon",
  },
  {
    id: 4,
    name: "Headphones",
    image: "https://example.com/headphones.jpg",
    description: "Top-quality sound and noise-canceling headphones",
    brand: "Sony",
  },
  {
    id: 5,
    name: "Smart Watches",
    image: "https://example.com/smartwatch.jpg",
    description: "Track fitness and stay connected with smart watches",
    brand: "Samsung",
  },
  {
    id: 6,
    name: "Gaming Consoles",
    image: "https://example.com/console.jpg",
    description: "Gaming consoles for an immersive experience",
    brand: "Sony",
  },
];

const deviceTypes = ["Laptops", "Smartphones", "Cameras", "Headphones", "Smart Watches", "Gaming Consoles"];
const brands = ["Dell", "Apple", "Canon", "Sony", "Samsung"];

const CategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deviceFilter, setDeviceFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeviceFilterChange = (e) => {
    const value = e.target.value;
    setDeviceFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleBrandFilterChange = (e) => {
    const value = e.target.value;
    setBrandFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDevice =
      deviceFilter.length === 0 || deviceFilter.includes(category.name);
    const matchesBrand = brandFilter.length === 0 || brandFilter.includes(category.brand);
    return matchesSearch && matchesDevice && matchesBrand;
  });

  return (
    <div>
      <TopHead />
      <MidHeader />
      <div className="bg-gray-50 min-h-screen px-6 py-10 flex">
        {/* Sidebar */}
        <div className="w-1/4 pr-6 hidden lg:block">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filter By</h2>

            {/* Device Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Device Type</h3>
              {deviceTypes.map((type) => (
                <div key={type} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={type}
                      onChange={handleDeviceFilterChange}
                      className="form-checkbox h-4 w-4 text-teal-500"
                    />
                    <span className="ml-2 text-gray-700 text-sm">{type}</span>
                  </label>
                </div>
              ))}
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Brand</h3>
              {brands.map((brand) => (
                <div key={brand} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={brand}
                      onChange={handleBrandFilterChange}
                      className="form-checkbox h-4 w-4 text-teal-500"
                    />
                    <span className="ml-2 text-gray-700 text-sm">{brand}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
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
                  placeholder="Search for categories..."
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
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 p-5 border-t-4 border-teal-500"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
