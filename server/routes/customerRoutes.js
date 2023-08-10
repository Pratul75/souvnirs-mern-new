const {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomers,
  updateCustomerById,
} = require("../controllers/customerController");
const authMiddleware = require("../middlewares");
const { verifyToken } = require("../middlewares");
const router = require("express").Router();

router.post("/customers/add-customer", authMiddleware(["vendor", "admin", "customer"]) createCustomer);
router.get("/customers/get-customers", authMiddleware(["vendor", "admin", "customer"]) getCustomers);
router.get("/customers/get-customer/:id", authMiddleware(["vendor", "admin", "customer"]) getCustomerById);
router.put(
  "/customers/update-customer/:id",
  authMiddleware(["vendor", "admin", "customer"])
  updateCustomerById
);
router.delete(
  "/customers/delete-customer/:id",
  authMiddleware(["vendor", "admin", "customer"])
  deleteCustomerById
);

module.exports = router;
