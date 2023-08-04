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

router.post("/address/add-address", addAddress);
router.get("/address/get-addresses", getAddresses);
router.get("/address/get-address/:id", authMiddleware, getAddressById);
router.put("/address/update-address/:id", authMiddleware, updateAddress);
router.delete("/address/delete-address/:id", authMiddleware, deleteAddress);

module.exports = router;
