import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { upload } from "./src/Middleware/Multer.Middleware.js";
const app = express();

// Enabling CORS
app.use(
  cors({
    origin:" http://localhost:5173", //Allowing only the specified origin to access resources
    credentials: true, // Allowing cookies and other credentials to be sent in cross-origin requests
  })
);

// Middleware to parse JSON payloads with a size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Middleware to parse URL-encoded payloads with a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse cookies attached to the client request object
app.use(cookieParser());

import userRouter from "./src/Routes/user.route.js";

app.use("/api/v1/users", userRouter);

import ProductRouter from "../Backend/src/Routes/Prouct.routes.js";

app.use("/api/v1/products", ProductRouter);

import CartRouter from "../Backend/src/Routes/Cart.routes.js"

app.use("/api/v1/Cart",CartRouter)

import ReviewRouter from "./src/Routes/review.routes.js";

app.use("/api/v1/reviews",ReviewRouter)

import OrderRouter from "./src/Routes/Order.routes.js"

app.use("/api/v1/order", OrderRouter)
// Exporting the app instance for use in other parts of the application
export { app };
