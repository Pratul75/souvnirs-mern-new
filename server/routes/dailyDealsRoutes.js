const router = require("express").Router();
const {
  createModal,
  getModalData,
  getDailyDealsData,
  checkProductList,
  //   deleteCouponById,
  //   getAllCoupons,
  //   getCouponById,
  //   updateCouponById,
} = require("../controllers/dailyDealsController");
const authMiddleware = require("../middlewares");

// router.get(
//   "/coupon/get-all-coupons",
//   authMiddleware(["vendor", "admin", "customer"]),
//   getAllCoupons
// );
// router.get(
//   "/coupon/get-coupon-by-id/:id",
//   authMiddleware(["vendor", "admin", "customer"]),
//   getCouponById
// );
router.get(
  "/daily/deals/getData",
  // authMiddleware(["vendor", "admin", "customer"]),
  getModalData
);

router.get(
  "/daily/deals/getData/list",
  //   authMiddleware(["vendor", "admin", "customer"]),
  getDailyDealsData
);

router.get("/check/products/data", checkProductList);

router.post(
  "/daily/deals/create-coupon",
  authMiddleware(["vendor", "admin", "customer"]),
  createModal
);
// router.put(
//   "/coupon/update-coupon/:id",
//   authMiddleware(["vendor", "admin", "customer"]),
//   updateCouponById
// );
// router.delete(
//   "/coupon/delete-coupon/:id",
//   authMiddleware(["vendor", "admin", "customer"]),
//   deleteCouponById
// );

module.exports = router;