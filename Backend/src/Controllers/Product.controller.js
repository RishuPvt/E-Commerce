import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asynchandler.js";
import { User } from "../Models/User.Model.js";
import { Product } from "../Models/Product.Model.js";
import { Cart } from "../Models/Cart.Model.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

//Handler to createProduct
const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
      discountPercentage,
    } = req.body;
console.log(req.body);

    if (!name || !description || !price || !category || !stock || !brand) {
      throw new ApiError(400, "All fields are required");
    }
    // console.log(req.file);

    const ImageLocalPath = req.file?.path;
    const imageUrl = await uploadOnCloudinary(ImageLocalPath);
    // console.log(imageUrl);

    const oldPrice = price; // Original price is the input price
    let newPrice = oldPrice; // Initialize with oldPrice

    if (discountPercentage) {
      newPrice = oldPrice - (oldPrice * discountPercentage) / 100;
    }

    const product = await Product.create({
      name,
      description,
      price: oldPrice, // Store the original price as `price`
      category,
      stock,
      brand,
      imageUrl: imageUrl.url,
      discountPercentage: discountPercentage || 0,
      oldPrice,
      newPrice,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, "Product registered Successfully", product));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(new ApiResponse(500, {}, "Product registered UnSuccessfully"));
  }
});

//Handler to getProductById
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product fetched successfully", product));
});

//Handler to getAllProducts
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      throw new ApiError(400, {}, "All Product not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "All Product fetched successfully", products));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, "All Product fetched Unsuccessfully"));
  }
});

//Handler to updateProduct
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    stock,
    discountPercentage,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !brand ||
    !stock ||
    !discountPercentage
  ) {
    throw new ApiError(400, "One fields is required");
  }
  const { id } = req.params;

  const oldPrice = price; // Original price is the input price
  let newPrice = oldPrice; // Initialize with oldPrice

  if (discountPercentage) {
    newPrice = oldPrice - (oldPrice * discountPercentage) / 100;
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        description,
        price,
        category,
        brand,
        stock,
        discountPercentage: discountPercentage || 0,
        oldPrice,
        newPrice,
      },
    },
    { new: true }
  );
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Product details updated successfully")
    );
});

//Handler to deleteProduct
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Deleted successfully"));
});

export {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
