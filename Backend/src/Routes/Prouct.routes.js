import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../Controllers/Product.controller.js";
import { Router } from "express";
import { verifyJWT } from "../Middleware/auth.middleware.js";
import { adminCheck } from "../Middleware/isAdmin.middleware.js";
const router = Router();

router.route("/productregister").post( verifyJWT,adminCheck,createProduct);
router.route("/getProduct/:id").get( verifyJWT,getProductById);
router.route("/getallproducts").get( verifyJWT,getAllProducts);
router.route("/update-product/:id").patch( verifyJWT,adminCheck,updateProduct);
router.route("/deleteProduct/:id").delete( verifyJWT,adminCheck,deleteProduct);
export default router;
