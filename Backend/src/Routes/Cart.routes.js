import { addToCart ,getCart ,deleteCartItem ,updateCartItem} from "../Controllers/Cart.controller.js";
import { Router } from "express";
import {verifyJWT} from "../Middleware/auth.middleware.js"

const router= Router();

router.route("/add-Cart/:userId").post(addToCart);
router.route("/getCart/:userId").get(getCart);
router.route("/deleteCart/:id").delete(verifyJWT,deleteCartItem);
router.route("/updateCartItem/:userId/item/:productId").put(updateCartItem);

export default router