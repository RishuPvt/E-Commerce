import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Order } from "../Models/Order.Model.js";
import { User } from "../Models/User.Model.js";
import { Cart } from "../Models/Cart.Model.js";

const createOrder = asyncHandler(async (req, res) => {
 

  const { totalAmount, shippingAddress, paymentMethod } = req.body;

  if (!totalAmount || !shippingAddress || !paymentMethod) {
    throw new ApiError(
      400,
      "All fields are required: totalPrice, shippingAddress, and paymentMethod"
    );
  }
  const { CartId } = req.params;

  const cart = await Cart.findById(CartId);

  const userId = req.user?._id;

  if (!userId && !cart) {
    throw new ApiError(
      401,
      "Unauthorized: User not authenticated or cart not found"
    );
  }

  if (userId?.toString() === cart.userId?.toString()) {
    const order = await Order.create({
      userId: userId,
      cart: CartId,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: "confom", // Default status
    });
    if (!order) {
      throw new ApiError(500, "Failed to create the order");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, "Order Placed Successfully", order));
  } else {
    throw new ApiError(403, "You are not authorized to delete this review");
  }
});

const getOrderHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  //console.log(userId);

  if (!userId) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }
  const order = await Order.find({ userId: userId }).sort({ createdAt: -1 })

  if (!order || order.length === 0) {
    throw new ApiError(404, "No orders found for the user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Order history fetched successfully",order));
});

const getOrderDetails = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate(
    "userId",
    "fullName phone"
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.userId._id.toString() !== req.user?._id.toString()) {
    throw new ApiError(403, "You are not authorized to view this order");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order details fetched successfully"));
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the order by ID
  const order = await Order.findById(id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Update the status of the order to "canceled"
  if (order.orderStatus === "pending") {
    throw new ApiError(
      400,
      `Order cannot be canceled as it is currently "${order.orderStatus}"`
    );
  }

  order.orderStatus = "Cancelled";
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order has been successfully canceled"));
});

export { createOrder, getOrderHistory, getOrderDetails, cancelOrder };
