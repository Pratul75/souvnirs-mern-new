const {
  deleteCheckoutById,
  getAllCheckouts,
  getSpecificCheckout,
  updateCheckoutById,
  createCheckout,
  deleteSpecificCustomerCheckout,
} = require("../controllers/checkoutController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.get(
  "/checkout/get-all-checkouts",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCheckouts
);
router.post(
  "/remove/customer/checkout",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteSpecificCustomerCheckout
);


router.get(
  "/checkout/get-checkout-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getSpecificCheckout
);

router.post(
  "/checkout-add-checkout",
  authMiddleware(["vendor", "admin", "customer"]),
  createCheckout
);

router.put(
  "/checkout/update-checkout-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateCheckoutById
);

router.delete(
  "/checkout/delete-checkout-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"], deleteCheckoutById)
);

module.exports = router;
