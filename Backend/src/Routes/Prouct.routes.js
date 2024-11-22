import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../Controllers/Product.controller.js";
import { Router } from "express";
import { adminCheck } from "../Middleware/isAdmin.middleware.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/productregister").post( verifyJWT,createProduct);
router.route("/getProduct/:id").get(adminCheck, verifyJWT,getProductById);
router.route("/getallproducts").get( verifyJWT,getAllProducts);
router.route("/update-product/:id").patch(adminCheck, verifyJWT,updateProduct);
router.route("/deleteProduct/:id").delete(adminCheck, verifyJWT,deleteProduct);
export default router;
