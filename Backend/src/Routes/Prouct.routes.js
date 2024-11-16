import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../Controllers/Product.controller.js";
import { Router } from "express";
const router = Router();

router.route("/productregister").post(createProduct);
router.route("/getProduct/:id").get(getProductById);
router.route("/getallproducts").get(getAllProducts);
router.route("/update-product/:id").patch(updateProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);
export default router;
