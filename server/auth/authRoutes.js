const router = require("express").Router();
const {
  registerUser,
  registerVendor,
  userLogin,
  vendorLogin,
  adminLogin,
} = require("../auth/authController");

router.post("/auth/register/vendor", registerVendor);
router.post("/auth/register/user", registerUser);
router.post("/auth/login/vendor", vendorLogin);
router.post("/auth/login/user", userLogin);
router.post("/auth/login/admin", adminLogin);

module.exports = router;
