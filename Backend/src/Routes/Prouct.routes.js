import { createProduct , getProductById,getAllProducts ,updateProduct} from "../Controllers/Product.controller.js";
import { Router } from "express";
const router = Router();

router.route("/productregister").post(createProduct);
 router.route("/getProduct/:id").get(getProductById)
 router.route("/getallproducts").get(getAllProducts)
 router.route("/update-product/:id").patch(updateProduct)
export default router;
