const router = require("express").Router();
const {
  registerVendor,
  registerCustomer,
  loginUser,
} = require("../auth/authController");

router.post("/auth/register/vendor", registerVendor);
router.post("/auth/register/customer", registerCustomer);
router.post("/auth/login", loginUser);

module.exports = router;
