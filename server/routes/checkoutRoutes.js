const {
  deleteCheckoutById,
  getAllCheckouts,
  getSpecificCheckout,
  updateCheckoutById,
  createCheckout,
  deleteSpecificCustomerCheckout,
  getAllCheckoutsList,
  getCheckOutById,
  getCustomerListCheckOut,
  deletCheckOut,
} = require("../controllers/checkoutController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.get(
  "/checkout/customer/getall",
  authMiddleware(["customer"]),
  getCustomerListCheckOut
);

router.delete(
  "/customer/delete/checkout",
  authMiddleware(["customer"]),
  deletCheckOut
);

router.get(
  "/checkout/get-all-checkouts",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCheckouts
);

router.get(
  "/checkout/get-checkouts/byId",
  // authMiddleware(["vendor", "admin", "customer"]),
  getCheckOutById
);

router.get(
  "/checkout/get-all-checkouts/list",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCheckoutsList
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
