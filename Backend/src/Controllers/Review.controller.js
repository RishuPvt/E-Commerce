import { Review } from "../Models/Review.model.js";
import { Product } from "../Models/Product.Model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asynchandler.js";

const addReview = asyncHandler(async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const { userId } = req.params;

    // Validate inputs
    if (!productId || !rating || !comment) {
      throw new ApiError(
        400,
        "All fields (productId, rating, comment) are required"
      );
    }
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
      throw new ApiError(400, "Rating must be a number between 0 and 5");
    }

    // Fetch product
    const product = await Product.findById(productId).populate("reviews");
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Check if user has already submitted a review
    const existingReview = product.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );
    if (existingReview) {
      throw new ApiError(400, "Review already submitted by this user");
    }

    // Create a new review
    const review = await Review.create({
      user: userId,
      rating,
      comment,
    });

    // Add review reference to the product
    product.reviews.push(review._id);
    await product.save();

    res
      .status(201)
      .json(new ApiResponse(201, review, "Review registered successfully"));
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json(new ApiResponse(error.statusCode, {}, error.message));
    }

    res.status(500).json(new ApiResponse(500, {}, "Internal Server Error"));
  }
});

const getReviewsForProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate({
      path: "reviews",
      select: "user rating comment createdAt",populate: {
        path: "user",
        select: "username",
      }
    });
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, "Reviews fetched successfully",product.reviews)
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Reviews fetched fetched Unsuccessfully"));
  }
});

const getReviewsByUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ user: userId });
    if (!reviews || reviews.length === 0) {
      throw new ApiError(404, "No reviews found for this user");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, reviews, "User reviews fetched successfully"));
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "User reviews fetched Unsuccessfully"));
  }
});

const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    throw new ApiError(400, "One fields is required");
  }

  const review = await Review.findByIdAndUpdate(reviewId, {
    $set: {
      rating,
      comment,
    },
  });
  if (!review) {
    throw new ApiError(404, "Review not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, review, "review updated successfully"));
});

const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findByIdAndDelete(reviewId);

  if (!review) {
    throw new ApiError(404, "review not found");
  }
  const product = await Product.findOneAndUpdate(
    { reviews: reviewId },
    { $pull: { reviews: reviewId } },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, review, "review Deleted successfully"));
});
export {
  addReview,
  getReviewsForProduct,
  getReviewsByUser,
  updateReview,
  deleteReview,
};
