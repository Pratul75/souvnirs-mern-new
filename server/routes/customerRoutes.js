const {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomers,
  updateCustomerById,
} = require("../controllers/customerController");
const { verifyToken } = require("../middlewares");
const router = require("express").Router();

router.post("/customers/add-customer", createCustomer);
router.get("/customers/get-customers", getCustomers);
router.get("/customers/get-customer/:id", getCustomerById);
router.put("/customers/update-customer/:id", updateCustomerById);
router.delete("/customers/delete-customer/:id", deleteCustomerById);

module.exports = router;
