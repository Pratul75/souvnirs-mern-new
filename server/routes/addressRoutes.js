const {
  addAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const authMiddleware = require("../middlewares");
const { verifyToken } = require("../middlewares");
const router = require("express").Router();

router.post(
  "/address/add-address",
  authMiddleware(["vendor", "admin", "customer"]),
  addAddress
);
router.get(
  "/address/get-addresses",
  authMiddleware(["vendor", "admin", "customer"]),
  getAddresses
);
router.get(
  "/address/get-address/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getAddressById
);
router.put(
  "/address/update-address/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateAddress
);
router.delete("/address/delete-address/:id", authMiddleware(["vendor", "admin", "customer"]) deleteAddress);

module.exports = router;
