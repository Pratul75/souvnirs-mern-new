const router = require("express").Router();
const {
  createModal,
  deleteCouponById,
  getAllCoupons,
  getCouponById,
  updateCouponById,
} = require("../controllers/couponController");
const authMiddleware = require("../middlewares");

router.get("/coupon/get-all-coupons", authMiddleware, getAllCoupons);
router.get("/coupon/get-coupon-by-id/:id", authMiddleware, getCouponById);
router.post("/coupon/create-coupon", authMiddleware, createModal);
router.put("/coupon/update-coupon/:id", authMiddleware, updateCouponById);
router.delete("/coupon/delete-coupon/:id", authMiddleware, deleteCouponById);

module.exports = router;
