const router = require("express").Router();
const {
  addRefund,
  deleteRefund,
  getAllRefunds,
  getRefundById,
  updateRefund,
} = require("../controllers/refundController");

router.get("/refund/get-all-refunds", getAllRefunds);
router.get("/refund/get-refund-by-id/:id", getRefundById);
router.post("/refund/add-refund", addRefund);
router.put("/refund/update-refund/:id", updateRefund);
router.delete("/refund/delete-refund/:id", deleteRefund);

module.exports = router;
