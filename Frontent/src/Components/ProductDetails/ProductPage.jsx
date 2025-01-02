import React, { useEffect, useState } from "react";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import MidHeader from "../Header/MidHeader";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUserContext } from "../../context/Usercontext";
import axiosinstance from "../axios/axiosinstance";
const ProductPage = ({
  product,
  reviews,
  onAddReview,
  onDeleteReview,
  onUpdateReview,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const handleReviewSubmit = () => {
    if (!newComment.trim() || newRating <= 0) {
      toast.error("Please provide a valid comment and rating.");
      return;
    }

    if (editingReviewId) {
      onUpdateReview(editingReviewId, {
        comment: newComment,
        rating: newRating,
      });
      setEditingReviewId(null);
    } else {
      onAddReview({ comment: newComment, rating: newRating });
    }

    setNewComment("");
    setNewRating(0);
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review._id);
    setNewComment(review.comment);
    setNewRating(review.rating);
  };

  return (
    <>
      <MidHeader />
      <div className="container mx-auto px-4 py-10">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
            />
          </div>

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

            <div className="flex items-center mb-4">
              <label className="text-gray-600 mr-4">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 rounded-l-md"
                  onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200 rounded-r-md"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button className="mt-6 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition duration-200">
              <FaCartPlus className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Customer Reviews
          </h2>
          {reviews ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      {review.user?.username || "Anonymous"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                  <div className="flex mt-2">
                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                      onClick={() => handleEditReview(review)}
                    >
                      <MdEdit className="mr-1" /> Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 flex items-center"
                      onClick={() => onDeleteReview(review._id)}
                    >
                      <MdDelete className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ):(
            <div className="text-center py-16">
            <AiOutlineShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 text-lg">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
          )}
       

          <div className="mt-8 border-t border-gray-300 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingReviewId ? "Edit Review" : "Write a Review"}
            </h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex items-center mb-4">
              <label className="text-gray-600 mr-4">Rating:</label>
              <select
                className="border border-gray-300 rounded-md p-2"
                value={newRating}
                onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={handleReviewSubmit}
            >
              {editingReviewId ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductApp = () => {
  const path = window.location.pathname;
  const eachPath = path.split("/");
  const id = eachPath[2];

    const {user:userId} = useUserContext();
//console.log(userId);

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axiosinstance.get(
        `https://e-commerce-r9xo.onrender.com/api/v1/products/getProduct/${id}`,
        { withCredentials: true }
      );
      setProduct(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axiosinstance.get(
        `https://e-commerce-r9xo.onrender.com/api/v1/reviews/getReviewsForProduct/${id}`,
        { withCredentials: true }
      );
      setReviews(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch reviews.");
    }
  };

  const addReview = async (newReview) => {
    try {
      const response = await axiosinstance.post(
        `https://e-commerce-r9xo.onrender.com/api/v1/reviews/addreview/${userId.userId}`,
        { productId: product._id, ...newReview },
        { withCredentials: true }
      );
      setReviews((prevReviews) => [...prevReviews, response.data.data]);
      toast.success("Review added successfully!");
    } catch (error) {
      console.error(error)
      toast.error("Failed to add review.");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const data = await axiosinstance.delete(
        `https://e-commerce-r9xo.onrender.com/api/v1/reviews/deleteReview/${reviewId}`,
        { withCredentials: true }
      );
      setReviews((prevReviews) =>
        prevReviews.filter(
          (review) => review._id.toString() !== reviewId.toString()
        )
      );

      toast.success("Review deleted successfully!");
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete review.");
    }
  };

  const updateReview = async (reviewId, updatedReview) => {
    try {
      const response = await axiosinstance.put(
        `https://e-commerce-r9xo.onrender.com/api/v1/reviews/updateReview/${reviewId}`,
        updatedReview,
        { withCredentials: true }
      );
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? response.data.data : review
        )
      );
      toast.success("Review updated successfully!");
    } catch (error) {
      toast.error("Failed to update review.");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  return (
    <ProductPage
      product={product}
      reviews={reviews}
      onAddReview={addReview}
      onDeleteReview={deleteReview}
      onUpdateReview={updateReview}
    />
  );
};

export default ProductApp;
