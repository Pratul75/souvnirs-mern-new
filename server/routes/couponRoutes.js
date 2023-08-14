const router = require("express").Router();
const {
  createModal,
  deleteCouponById,
  getAllCoupons,
  getCouponById,
  updateCouponById,
} = require("../controllers/couponController");
const authMiddleware = require("../middlewares");

router.get(
  "/coupon/get-all-coupons",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCoupons
);
router.get(
  "/coupon/get-coupon-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCouponById
);
router.post(
  "/coupon/create-coupon",
  authMiddleware(["vendor", "admin", "customer"]),
  createModal
);
router.put(
  "/coupon/update-coupon/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateCouponById
);
router.delete(
  "/coupon/delete-coupon/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteCouponById
);

module.exports = router;
