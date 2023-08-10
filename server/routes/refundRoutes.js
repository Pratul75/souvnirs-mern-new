const router = require("express").Router();
const {
  addRefund,
  deleteRefund,
  getAllRefunds,
  getRefundById,
  updateRefund,
} = require("../controllers/refundController");
const authMiddleware = require("../middlewares");

router.get("/refund/get-all-refunds", authMiddleware, getAllRefunds);
router.get("/refund/get-refund-by-id/:id", authMiddleware, getRefundById);
router.post("/refund/add-refund", authMiddleware, addRefund);
router.put("/refund/update-refund/:id", authMiddleware, updateRefund);
router.delete("/refund/delete-refund/:id", authMiddleware, deleteRefund);

module.exports = router;
