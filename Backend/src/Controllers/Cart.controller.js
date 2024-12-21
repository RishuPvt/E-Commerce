import { Cart } from "../Models/Cart.Model.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

//  Handler to user addToCart
const addToCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    throw new ApiError(400, "Product ID and quantity are required");
  }

  let cart = await Cart.findOne({ userId: userId });

  if (cart) {
    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // If the product exists, update its quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the product does not exist, add it to the cart
      cart.items.push({ productId, quantity });
    }
  } else {
    // If no cart exists for the user, create a new cart
    cart = await Cart.create({
      userId: userId,
      items: [{ productId, quantity }],
    });
  }

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Product added to cart successfully", cart));
});

//handler to user getCart
const getCart = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.find({ userId: userId }).populate(
      "items.productId",
      "name price imageUrl"
    );
    if (!cart) {
      throw new ApiError(404, "Cart not found for the user");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Cart fetched successfully", cart));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiError(404, "Cart fetched Unsuccessfully"));
  }
});

//handler to user DeleteCart
const deleteCartItem = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  const userId = req.user?._id;
  //console.log(userId);

  if (!userId) {
    throw new ApiError(401, "Unauthorized: User not found");
  }

  //console.log("Received delete request for Product ID:", productId);

  // Find the user's cart
  const cart = await Cart.findOne({ userId: userId });

  //console.log(cart);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  // Filter out the product from the items array
  const updatedProducts = cart.items.filter((product) => {
    // console.log("product is ", product);
    //console.log(product._id.toString() !== productId.toString());

    return product._id.toString() !== productId.toString();
  });
  // console.log("Cart before deletion:", cart.items);

  cart.items = updatedProducts;
  await cart.save();
  // console.log("Updated Products after deletion:", updatedProducts);

  return res.status(200).json(
    new ApiResponse(200, "Cart item deleted successfully", {
      updatedProducts,
    })
  );
});

//handler to user updateCartItem
const updateCartItem = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;

  const { quantity } = req.body;

  if (quantity <= 0) {
    throw new ApiError(400, "Quantity must be greater than zero");
  }

  const cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  const itemIndex = cart.items.findIndex((items) => {
    return items._id.toString() === productId.toString();
  });

  if (itemIndex === -1) {
    throw new ApiError(404, "Cart item not found");
  }

  // Update the quantity of the item
  cart.items[itemIndex].quantity = quantity;

  await cart.save();
  res
    .status(200)
    .json(new ApiResponse(200, "Cart item updated successfully", cart));
});

export { addToCart, getCart, deleteCartItem, updateCartItem };
