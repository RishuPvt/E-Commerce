import { Cart } from "../Models/Cart.Model.js";
import { Product } from "../Models/Product.Model.js";
import { User } from "../Models/User.Model.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

//  Handler to user addToCart
const addToCart = asyncHandler(async (req, res) => {
    //Validate the User: Ensure that the user is authenticated.
    //Find or Create the Cart: Either retrieve the user’s existing cart or create a new one.
    //Add or Update Product Quantity: Add the selected product to the cart or update the quantity if it’s already in the cart.
    //Save the Cart: Save any changes to the database and return the updated cart to the user.
  
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(401, "User does not exist");
    }
  
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      throw new ApiError(400, "Product ID and quantity are required.");
    }
  
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
  
    let cart = await Cart.findOne(req.user?._id);
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
  
    const cartItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (cartItemIndex > -1) {
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  
    await cart.save();
  
    return res
      .status(200)
      .json(new ApiResponse(200, { cart }, "Product added to cart successfully"));
  });



  export{
    addToCart
  }