import { addReview ,getReviewsForProduct ,getReviewsByUser, updateReview ,deleteReview } from "../Controllers/Review.controller.js";
import { Router } from "express";
import { verifyJWT } from "../Middleware/auth.middleware.js";

const router= Router()

router.route("/addreview/:userId").post(verifyJWT , addReview)
router.route("/getReviewsForProduct/:productId").get(verifyJWT , getReviewsForProduct)
router.route("/getReviewsByUser/:userId").get(verifyJWT , getReviewsByUser)
router.route("/updateReview/:reviewId").patch(verifyJWT , updateReview)
router.route("/deleteReview/:reviewId").delete(verifyJWT , deleteReview)
export default router;