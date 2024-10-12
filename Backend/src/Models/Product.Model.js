import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, // Indexed for faster search
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    imageUrl: {
      type: String, // URL to the Product image stored in Cloudinary
      required: true,
    },
    ratings: {
      enum:[0,1,3,4,5],
      default: 0,
    },
    reviews: [
      {
        userId: String,
        comment: String,
        rating: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
