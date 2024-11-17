import { Schema } from "mongoose";
import { mongoose } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
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
      type: Array, 
      default: [],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String, // Refresh token for maintaining session
    },
    isAdmin: { 
      type: Boolean, default: false 
    }, // default to false for regular users
  },
  {
    timestamps: true,
  }
);

// Pre-save bcrypt middleware to hash the password
userSchema.pre("save", async function (next) {
  // Check if the password is modified or is new
  if (!this.isModified("password")) return next();

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);

  // Replace the password with the hashed password
  this.password = hashedPassword;
  next(); // Proceed to save the user document
});

// Instance method to check if the entered password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare entered password with the hashed password
};

userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    phone: this.phone,
    username: this.username,
    fullName: this.fullName,
  };
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY };

  return jwt.sign(payload, secretKey, options);
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};


export const User = mongoose.model("User", userSchema);
