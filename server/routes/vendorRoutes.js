const {
  createVendor,
  deleteVendor,
  getVendors,
  getVendorById,
  getVendorsCount,
  updateVendor,
  getVendorsList,
} = require("../controllers/vendorController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.post(
  "/vendors/add-vendor",
  authMiddleware(["vendor", "admin", "customer"]),
  createVendor
);
router.get(
  "/vendors/get-vendors",
  authMiddleware(["vendor", "admin", "customer"]),
  getVendors
);

router.get(
  "/vendors/get-vendors/list",
  authMiddleware(["vendor", "admin", "customer"]),
  getVendorsList
);

router.get(
  "/vendors/get-vendor/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getVendorById
);
router.get(
  "/vendors/get-vendors-count",
  authMiddleware(["vendor", "admin", "customer"]),
  getVendorsCount
);
router.delete(
  "/vendors/delete-vendor/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteVendor
);
router.put(
  "/vendors/update-vendor/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateVendor
);

module.exports = router;
