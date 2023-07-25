const router = require("express").Router();
const {
  addCart,
  deleteCart,
  getAllCarts,
  getCartById,
  updateCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middlewares");

router.get("/cart/get-all-carts", authMiddleware, getAllCarts);
router.get("/cart/get-cart-by-id/:id", authMiddleware, getCartById);
router.put("/cart/update-cart/:id", authMiddleware, updateCart);
router.delete("/cart/delete-cart/:id", authMiddleware, deleteCart);
router.post("/cart/add-cart", authMiddleware, addCart);

module.exports = router;
