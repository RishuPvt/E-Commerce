import {
  createOrder,
  getOrderHistory,
  getOrderDetails,
  cancelOrder,
} from "../Controllers/Order.controller.js";
import { Router } from "express";
import { verifyJWT } from "../Middleware/auth.middleware.js";

const router = Router();

router.route("/createOrder/:CartId").post(verifyJWT, createOrder);
router.route("/getOrderHistory").get(verifyJWT, getOrderHistory);
router.route("/getOrderDetails/:orderId").get(verifyJWT, getOrderDetails);
router.route("/cancelOrder/:id").delete(verifyJWT, cancelOrder);
export default router;
