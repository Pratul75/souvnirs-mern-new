const router = require("express").Router();
const {
  getReviewList,
  UpdateReview,
  DeleteReview,
} = require("../controllers/reviewController");
const authMiddleware = require("../middlewares");

router.get(
  "/review/get-all-reviews",
  authMiddleware(["vendor", "admin", "customer"]),
  getReviewList
);
router.put(
  "/review/update/get-all-reviews/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  UpdateReview
);
router.delete(
  "/review/delete/get-all-reviews/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  DeleteReview
);

module.exports = router;
