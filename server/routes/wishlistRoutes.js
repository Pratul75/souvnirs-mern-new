const {
  createWishlist,
  getwishlistItems,
  deleteWishlist,
  UpdateWishlist,
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
  authMiddleware(["vendor", "admin", "customer"]),
  getwishlistItems
);
router.put(
  "/wishlist/update/getmywishlist/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  UpdateWishlist
);
router.delete(
  "/wishlist/delete/getmywishlist/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteWishlist
);

module.exports = router;
