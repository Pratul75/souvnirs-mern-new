const router = require("express").Router();
const {
  addCart,
  deleteCart,
  getAllCarts,
  getCartById,
  updateCart,
  addItemToCart,
  getMycartItems,
  createCustomerCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middlewares");

router.get(
  "/cart/get-all-carts",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCarts
);
router.get(
  "/cart/get-cart-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCartById
);
router.put(
  "/cart/update-cart/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateCart
);
router.delete(
  "/cart/delete-cart/:id",
  authMiddleware(["admin", "customer"]),
  deleteCart
);
router.post("/cart/create", authMiddleware(["customer"]), createCustomerCart);
router.get("/cart/mycart", authMiddleware(["customer"]), getMycartItems);
router.post("/cart/add-cart", authMiddleware(["admin", "customer"]), addCart);

module.exports = router;
