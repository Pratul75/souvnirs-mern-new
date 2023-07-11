const router = require("express").Router();
const {
  addCart,
  deleteCart,
  getAllCarts,
  getCartById,
  updateCart,
} = require("../controllers/cartController");

router.get("/cart/get-all-carts", getAllCarts);
router.get("/cart/get-cart-by-id/:id", getCartById);
router.put("/cart/update-cart/:id", updateCart);
router.delete("/cart/delete-cart/:id", deleteCart);
router.post("/cart/add-cart", addCart);

module.exports = router;
