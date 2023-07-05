const {
  createVendor,
  deleteVendor,
  getVendors,
  getVendorById,
  getVendorsCount,
  updateVendor,
} = require("../controllers/vendorController");

const router = require("express").Router();

router.post("/vendors/add-vendor", createVendor);
router.get("/vendors/get-vendors", getVendors);
router.get("/vendors/get-vendor/:id", getVendorById);
router.get("/vendors/get-vendors-count", getVendorsCount);
router.delete("/vendors/delete-vendor/:id", deleteVendor);
router.put("/vendors/update-vendor/:id", updateVendor);

module.exports = router;
