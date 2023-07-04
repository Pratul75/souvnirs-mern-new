const {
  createVendor,
  deleteVendor,
  getVendorById,
  getVendors,
  updateVendor,
} = require("../controllers/vendorController");

const router = require("express").Router();

// add vendor
router.post("/vendors/add-vendor", createVendor);
// get all vendors
router.get("/vendors/get-vendors", getVendors);
// get vendor based on id
router.get("/vendors/get-vendor/:id", getVendorById);
// delete vendor
router.delete("/vendors/delete-vendor/:id", deleteVendor);
// update vendor
router.put("/vendors/update-vendor/:id", updateVendor);

module.exports = router;
