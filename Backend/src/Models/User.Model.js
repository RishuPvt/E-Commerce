import { schema } from "mongoose";
import { mongoose } from "mongoose";

const userSchema = new schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      
    },
    avatar: {
      type: String, // URL to the user's avatar image stored in Cloudinary
      
    },
    address: {
      type: String,
      required: true,
    },

    cart: {
      type: Array,//
      default: [],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String, // Refresh token for maintaining session
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
