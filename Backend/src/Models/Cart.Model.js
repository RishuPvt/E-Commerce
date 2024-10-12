import mongoose from "mongoose";
import { Schema } from "mongoose";

const CartSchema = new Schema (
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true },
        products: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
          },

    },
    {
        timestamps: true
    }
)

export const Cart = mongoose.model("Cart" , CartSchema )