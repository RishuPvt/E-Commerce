import mongoose from "mongoose";
import { Schema } from "mongoose";
const productSchema = new Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true },
    ratings: { type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0 },
    reviews: [
      {
        userId: String,
        comment: String,
        rating: { type: Number, enum: [0, 1, 2, 3, 4, 5] },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
