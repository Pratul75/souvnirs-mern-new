const router = require("express").Router();
const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} = require("../controllers/prodcutReviewsController");

router.get("/product-review/get-all-reviews", getAllReviews);
router.get("/product-review/get-review/:id", getReviewById);
router.post("/product-review/add-review", createReview);
router.delete("/product-review/delete-review/:id", deleteReview);
router.put("/product-review/update-review/:id", updateReview);

module.exports = router;
