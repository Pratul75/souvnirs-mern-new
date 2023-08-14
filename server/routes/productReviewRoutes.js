const router = require("express").Router();
const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} = require("../controllers/prodcutReviewsController");
const authMiddleware = require("../middlewares");

router.get(
  "/product-review/get-all-reviews",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllReviews
);
router.get(
  "/product-review/get-review/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getReviewById
);
router.post(
  "/product-review/add-review",
  authMiddleware(["vendor", "admin", "customer"]),
  createReview
);
router.delete(
  "/product-review/delete-review/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteReview
);
router.put(
  "/product-review/update-review/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateReview
);

module.exports = router;
