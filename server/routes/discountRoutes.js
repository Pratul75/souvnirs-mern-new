const router = require("express").Router();
const {
  createDiscount,
  deleteDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
} = require("../controllers/discountController");
const authMiddleware = require("../middlewares");

router.get("/discount/get-all-discounts", authMiddleware, getAllDiscounts);
router.get("/discount/get-discount-by-id/:id", authMiddleware, getDiscountById);
router.post("/discount/create-discount", authMiddleware, createDiscount);
router.put("/discount/update-discount/:id", authMiddleware, updateDiscount);
router.delete("/discount/delete-discount/:id", authMiddleware, deleteDiscount);

module.exports = router;
