const router = require("express").Router();
const {
  createModal,
  deleteCouponById,
  getAllCoupons,
  getCouponById,
  updateCouponById,
} = require("../controllers/couponController");

router.get("/coupon/get-all-coupons", getAllCoupons);
router.get("/coupon/get-coupon-by-id/:id", getCouponById);
router.post("/coupon/create-coupon", createModal);
router.put("/coupon/update-coupon/:id", updateCouponById);
router.delete("/coupon/delete-coupon/:id", deleteCouponById);

module.exports = router;
