import { asyncHandler } from "../Utils/asynchandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/User.Model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

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
    avatar,
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
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
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
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200, // Status code 200 (OK)
        {
          id: user._id,
          phone: user.phone,
          email: user.email,
        },
        "User logged In Successfully"
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
        new ApiResponse(
          200,
          { id: user._id, 
            phone: user.phone, 
            email: user.email 
          },
          "User logged out successfully"
        )
      ); 
  } catch (error) {
    // console.error("Logout error:", error); // Log the error for debugging
    throw new ApiError(500, "Error while logging out user");
  }
});

export { registerUser, loginUser, logoutUser };
