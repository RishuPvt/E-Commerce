import { registerUser , loginUser ,logoutUser } from "../Controllers/User.controller.js";
import {Router} from "express"
import { verifyJWT } from "../Middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser,)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)

export default router;
