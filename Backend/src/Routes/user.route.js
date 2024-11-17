import {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  refreshAccessToken,
  tioggleAdmin
} from "../Controllers/User.controller.js";
import { Router } from "express";
import { verifyJWT } from "../Middleware/auth.middleware.js";
import { upload } from "../Middleware/Multer.Middleware.js";
const router = Router();

router.route("/register").post(upload.single("avatar"),registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/update-UserAvatar").patch(verifyJWT, updateUserAvatar);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/Admin-pannel/:userId").post(verifyJWT,tioggleAdmin)

export default router;
