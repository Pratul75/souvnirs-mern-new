const { createWishlist, getwishlistItems } = require("../controllers/wishlistController");
const authMiddleware = require("../middlewares");

const router = require("express").Router()

router.post("/wishlist/create", createWishlist)
router.get("/wishlist/getmywishlist", authMiddleware, getwishlistItems)


module.exports = router;