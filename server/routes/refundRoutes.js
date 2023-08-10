const router = require("express").Router();
const {
  addRefund,
  deleteRefund,
  getAllRefunds,
  getRefundById,
  updateRefund,
} = require("../controllers/refundController");
const authMiddleware = require("../middlewares");

router.get(
  "/refund/get-all-refunds",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllRefunds
);
router.get(
  "/refund/get-refund-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getRefundById
);
router.post(
  "/refund/add-refund",
  authMiddleware(["vendor", "admin", "customer"]),
  addRefund
);
router.put(
  "/refund/update-refund/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateRefund
);
router.delete(
  "/refund/delete-refund/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteRefund
);

module.exports = router;
