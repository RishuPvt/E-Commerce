import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backebdUrl } from "../../Api";
import { NavLink } from "react-router-dom";
import axiosinstance from "../axios/axiosinstance";
const CreateProduct = () => {
  const [loading, setloading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    discountPercentage: "",
    imageUrl: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleFileChange = (e) => {
    setProductData({ ...productData, imageUrl: e.target.files[0] });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", productData.name);
      form.append("description", productData.description);
      form.append("category", productData.category);
      form.append("price", productData.price);
      form.append("brand", productData.brand);
      form.append("stock", productData.stock);
      form.append("discountPercentage", productData.discountPercentage);
      if (productData.imageUrl) {
        form.append("imageUrl", productData.imageUrl);
      }
      const response = await axiosinstance.post(
        `${backebdUrl}/products/productregister`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Product created successfully!");
      }
    } catch (error) {
      toast.error("Failed to create product. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Create Product</h1>
        <form onSubmit={handlesubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded-md"
            required
          />
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded-md"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            placeholder="Brand"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="discountPercentage"
            value={productData.discountPercentage}
            onChange={handleInputChange}
            placeholder="Discount Percentage"
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className={`w-full p-2 text-white bg-blue-500 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>

        {/* Switch to Update Product */}
        <p className="mt-6 text-center text-base text-gray-600">
          Want To Update Products?{" "}
          <NavLink
            to="/update-product"
            className="text-indigo-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
          >
            UpdateProduct
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default CreateProduct;
