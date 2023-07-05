const {
  addAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const router = require("express").Router();

router.post("/address/add-address", addAddress);
router.get("/address/get-addresses", getAddresses);
router.get("/address/get-address/:id", getAddressById);
router.put("/address/update-address/:id", updateAddress);
router.delete("/address/delete-address/:id", deleteAddress);

module.exports = router;
