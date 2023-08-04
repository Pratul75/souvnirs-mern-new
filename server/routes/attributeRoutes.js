const {
  addAttribute,
  getAllAttributes,
  getAttributeById,
  deleteAttributeById,
  updateAttributeById,
  getattributesbyCategoryId,
} = require("../controllers/attributeController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.post("/attribute/add-attribute", addAttribute);
router.get("/attribute/get-all-attributes", authMiddleware, getAllAttributes);

router.get("/attribute/get-attribute/:id", authMiddleware, getAttributeById);
router.get("/attribute/get-all-attributes/:id", authMiddleware, getattributesbyCategoryId);
router.put("/attribute/update-attribute/:id", authMiddleware, updateAttributeById);
router.delete("/attribute/delete-attribute/:id", authMiddleware, deleteAttributeById);

module.exports = router;
