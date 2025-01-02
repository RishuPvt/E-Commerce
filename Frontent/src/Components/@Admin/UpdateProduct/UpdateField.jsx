import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backebdUrl } from "../../../Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axiosinstance from "../../axios/axiosinstance";
const UpdateField = () => {
  const path = window.location.pathname;
  const eachPath = path.split("/");
  const productId = eachPath[2];
  const navigate = useNavigate();
  //console.log(productId);

  const [updateproducts, setproducts] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    discountPercentage: "",
  });
  const [loading, setloading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproducts({ ...updateproducts, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      //console.log(updateproducts);

      const response = await axiosinstance.patch(
        `${backebdUrl}/products/update-product/${productId}`,
        JSON.stringify(updateproducts),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Product updated successfully!");
        navigate("/update-product");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update product. Please try again."
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Update Product</h1>
        <form onSubmit={handlesubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={updateproducts.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="description"
            value={updateproducts.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded-md"
          ></textarea>
          <input
            type="number"
            name="price"
            value={updateproducts.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="category"
            value={updateproducts.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="brand"
            value={updateproducts.brand}
            onChange={handleInputChange}
            placeholder="Brand"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="stock"
            value={updateproducts.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="discountPercentage"
            value={updateproducts.discountPercentage}
            onChange={handleInputChange}
            placeholder="Discount Percentage"
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className={`w-full p-2 text-white bg-blue-500 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>

        {/* Switch to Update Product */}
        <p className="mt-6 text-center text-base text-gray-600">
          Want To Create Products?{" "}
          <NavLink
            to="/create-product"
            className="text-indigo-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
          >
            CreateProducts
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default UpdateField;
