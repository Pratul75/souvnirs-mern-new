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

router.post("/customers/add-customer", authMiddleware, createCustomer);
router.get("/customers/get-customers", authMiddleware, getCustomers);
router.get("/customers/get-customer/:id", authMiddleware, getCustomerById);
router.put(
  "/customers/update-customer/:id",
  authMiddleware,
  updateCustomerById
);
router.delete(
  "/customers/delete-customer/:id",
  authMiddleware,
  deleteCustomerById
);

module.exports = router;
