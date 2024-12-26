import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/User.Model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../Utils/Cloudinary.js";

// Function to register a new user
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, phone
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { username, phone, fullName, address, password, email } = req.body;

  if (
    [username, phone, fullName, address, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ phone });

  if (existedUser) {
    throw new ApiError(409, "User with PhoneNo. already exists");
  }

  const avatarLocalPath = req.file?.path;

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    address,
    avatar: avatar.url,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Check if the user was successfully created
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Return the created user in the response
  return res
    .status(201)
    .json(new ApiResponse(200, "User registered Successfully", createdUser));
});

// Function to login a user
const loginUser = asyncHandler(async (req, res) => {
  // Extract login details (email, username, password) from the request body
  // Validate that either a username or phone no. is provided
  // If neither is provided, throw a 400 Bad Request error
  // Find the user by phone in the database
  // If the user doesn't exist, throw a 404 Not Found error
  // Validate the provided password using a method on the user schema (assuming isPasswordCorrect is a custom method)
  // If the password is invalid, throw a 401 Unauthorized error
  // Generate both access and refresh tokens for the authenticated user
  // Fetch the user's data again, excluding the password and refreshToken fields from the returned object
  // Set cookie options for security
  // Return the logged-in user's data along with the access and refresh tokens, setting them as cookies

  const { password, phone, email } = req.body;
  console.log(password, phone, email); // Log the login details (for debugging purposes)

  if (!phone && !email) {
    throw new ApiError(400, "phone or email is required");
  }
  const user = await User.findOne({ $or: [{ phone }, { email }] });

  // If the user doesn't exist, throw a 404 Not Found error
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user password");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
    sameSite:'none'
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200, // Status code 200 (OK)
        "User logged In Successfully",
        {
          id: user._id,
          phone: user.phone,
          email: user.email,
          isAdmin: user.isAdmin,
        }
      )
    );
});

// Function to logout a user
const logoutUser = asyncHandler(async (req, res) => {
  // Find the user by their ID (retrieved from the request object) and remove the 'refreshToken' field from the user document
  // Set the options for clearing cookies (used when clearing tokens from the browser)
  // Clear 'accessToken' and 'refreshToken' cookies and send a response

  try {
    // Retrieve the user ID from the request object
    const userId = req.user._id;

    // console.log("userid :",userId);

    // Find the user by ID
    const user = await User.findById(userId);
    // console.log("userid user :",user);

    // If the user is not found, throw a 404 error
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Remove the refresh token from the user document
    user.refreshToken = undefined;
    await user.save();

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(
        new ApiResponse(200, "User logged out successfully", {
          id: user._id,
          phone: user.phone,
          email: user.email,
        })
      );
  } catch (error) {
    // console.error("Logout error:", error); // Log the error for debugging
    throw new ApiError(500, "Error while logging out user");
  }
});

// Function to changeCurrentPassword of user
const changeCurrentPassword = asyncHandler(async (req, res) => {
  // Find the user by ID
  // Check if the old password is correct
  // Throw error if the old password is incorrect
  // Update the password and save the user without validation
  // Send success response
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Password changed successfully", {
        newPassword: user.password,
      })
    );
});

// Handler to get the current logged-in user
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully" , req.user,));
});

// Handler to update account details (full name and email)
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email, phone, address } = req.body;

  if (!(fullName || email || phone || address)) {
    // Throw error if required fields are missing
    throw new ApiError(400, "At least one field is required");
  }

  // Construct the update object dynamically
  const updateFields = {};
  if (fullName) updateFields.fullName = fullName;
  if (email) updateFields.email = email;
  if (phone) updateFields.phone = phone;
  if (address) updateFields.address = address;

  // Find the user by ID and update only the provided fields
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: updateFields },
    { new: true } // Return the updated user
  ).select("-password"); // Exclude password from the result

  // Send success response with updated user details
  return res
    .status(200)
    .json(new ApiResponse(200, "Account details updated successfully", user));
});

// Handler to update user avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  // Throw error if avatar file is missing
  // Delete old avatar image from Cloudinary
  // Get the user from the database
  // Extract the public ID from the existing avatar URL
  //Use the cloudinary.uploader.destroy() method, passing the public ID of the old image to delete it.
  // Upload new avatar to Cloudinary
  // Throw error if Cloudinary upload fails
  // Update user with new avatar URL
  // Send success response with updated user details
  console.log(req.file);

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is missing");
  }

  const userAvtarDelete = await User.findById(req.user?._id);
  if (userAvtarDelete.avatar) {
    const publicId = userAvtarDelete.avatar.split("/").pop().split(".")[0];
    await deleteOnCloudinary(publicId);
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

// Define the refreshAccessToken function to handle access token refreshing, wrapped with asyncHandler for error handling
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Get the incoming refresh token either from cookies or from the request body
  // If no refresh token is provided, throw a 401 Unauthorized error
  // Verify the incoming refresh token using JWT and the secret key from the environment variables
  // Find the user in the database using the decoded token's user ID
  // If no user is found, throw a 401 Unauthorized error
  // Check if the incoming refresh token matches the user's stored refresh token
  // If the tokens don't match, throw a 401 error indicating that the token is expired or has already been used
  // Set options for cookie security (httpOnly and secure for security purposes)
  // Generate new access and refresh tokens for the user
  // Return the new access token and refresh token in both cookies and JSON response
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request - No refresh token provided");
  }
  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite:'none'
    };

    const newRefreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const tioggleAdmin = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { pin } = req.body;

    if (pin !== process.env.PIN) {
      throw new ApiError(400, "PIN NOT MATCHED");
    }
    if (pin === process.env.PIN) {
      const userAdmin = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            isAdmin: true,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json(new ApiResponse(200, userAdmin, "Welcome to Admin Pannel"));
    }
    throw new ApiError(400, "User Not Found");
  } catch (error) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          error.message,
          "Something went wrong will login to admin pannel"
        )
      );
  }
});
export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  refreshAccessToken,
  tioggleAdmin,
};
