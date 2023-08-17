const {
  createWishlist,
  getwishlistItems,
} = require("../controllers/wishlistController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.post(
  "/wishlist/create",
  authMiddleware(["admin", "customer"]),
  createWishlist
);
router.get(
  "/wishlist/getmywishlist",
  // authMiddleware(["vendor", "admin", "customer"]),
  getwishlistItems
);

module.exports = router;
