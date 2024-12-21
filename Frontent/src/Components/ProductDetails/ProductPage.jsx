import React, { useEffect, useState } from "react";
import { FaStar, FaCartPlus } from "react-icons/fa";
import MidHeader from "../Header/MidHeader";
import axios from "axios";
import toast from "react-hot-toast";
const ProductPage = ({ product ,reviews }) => {
  const [quantity, setQuantity] = useState(1);


  return (
    <>
      {" "}
      <MidHeader />
      <div className="container mx-auto px-4 py-10">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="flex flex-col items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-green-700">
                ${product.price}
              </span>
              <span className="ml-4 text-gray-700 flex items-center">
                {product.rating} <FaStar className="ml-1 text-yellow-500" />
              </span>
            </div>
            <p className="mb-6 text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selection */}
            <div className="flex items-center mb-4">
              <label className="text-gray-600 mr-4">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  // onClick={() => handleQuantityChange("decrement")}
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 rounded-l-md"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  // onClick={() => handleQuantityChange("increment")}
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              // onClick={handleAddToCart}
              className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition duration-200"
            >
              <FaCartPlus className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          <div>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">
                    {review.user.username}
                  </span>
                  <span className="text-sm text-gray-500">{review.createdAt}</span>
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
        {/* <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="h-32 object-cover w-full rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {relatedProduct.name}
                </h3>
                <span className="text-gray-600">${relatedProduct.price}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

const App = () => {
  const [product, setproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchproduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/v1/products/getProduct/674d4cd77b4e37a01fab0d58",
        { withCredentials: true }
      );
      setproduct(response.data.data);
      //console.log(response.data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to fetch products. Please log in";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchproduct();
  }, []);


  const [reviews, setreviews] = useState([]);
const fetchreview =async()=>{
  try {
    const response = await axios.get(
      "http://localhost:7000/api/v1/reviews/getReviewsForProduct/674d4cd77b4e37a01fab0d58",
      { withCredentials: true }
    );
    setreviews(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    const errorMessage =
        error.response?.data?.message ||
        "Failed to fetch reviews. Please log in";
      toast.error(errorMessage);
  }finally{
setLoading(false)
  }
}

useEffect(()=>{
  fetchreview();
},[])










  return <ProductPage product={product} reviews={reviews} />;
};

export default App;
