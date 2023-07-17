const router = require("express").Router();
const {
  createDiscount,
  deleteDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
} = require("../controllers/discountController");

router.get("/discount/get-all-discounts", getAllDiscounts);
router.get("/discount/get-discount-by-id/:id", getDiscountById);
router.post("/discount/create-discount", createDiscount);
router.put("/discount/update-discount/:id", updateDiscount);
router.delete("/discount/delete-discount/:id", deleteDiscount);

module.exports = router;
