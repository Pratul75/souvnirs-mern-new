const router = require("express").Router();
const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} = require("../controllers/prodcutReviewsController");
const authMiddleware = require("../middlewares");

router.get("/product-review/get-all-reviews", authMiddleware, getAllReviews);
router.get("/product-review/get-review/:id", authMiddleware, getReviewById);
router.post("/product-review/add-review", authMiddleware, createReview);
router.delete(
  "/product-review/delete-review/:id",
  authMiddleware,
  deleteReview
);
router.put("/product-review/update-review/:id", authMiddleware, updateReview);

module.exports = router;
