const {
  createVendor,
  deleteVendor,
  getVendors,
  getVendorById,
  getVendorsCount,
  updateVendor,
} = require("../controllers/vendorController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.post("/vendors/add-vendor", authMiddleware, createVendor);
router.get("/vendors/get-vendors", authMiddleware, getVendors);
router.get("/vendors/get-vendor/:id", authMiddleware, getVendorById);
router.get("/vendors/get-vendors-count", authMiddleware, getVendorsCount);
router.delete("/vendors/delete-vendor/:id", authMiddleware, deleteVendor);
router.put("/vendors/update-vendor/:id", authMiddleware, updateVendor);

module.exports = router;
