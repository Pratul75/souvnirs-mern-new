const router = require("express").Router();
const {
  createDiscount,
  deleteDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
} = require("../controllers/discountController");
const authMiddleware = require("../middlewares");

router.get("/discount/get-all-discounts", authMiddleware(["vendor", "admin", "customer"]) getAllDiscounts);
router.get("/discount/get-discount-by-id/:id", authMiddleware(["vendor", "admin", "customer"]) getDiscountById);
router.post("/discount/create-discount", authMiddleware(["vendor", "admin", "customer"]) createDiscount);
router.put("/discount/update-discount/:id", authMiddleware(["vendor", "admin", "customer"]) updateDiscount);
router.delete("/discount/delete-discount/:id", authMiddleware(["vendor", "admin", "customer"]) deleteDiscount);

module.exports = router;
