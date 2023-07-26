const {
  addAttribute,
  getAllAttributes,
  getAttributeById,
  deleteAttributeById,
  updateAttributeById,
  getattributesbyCategoryId,
} = require("../controllers/attributeController");

const router = require("express").Router();

router.post("/attribute/add-attribute", addAttribute);
router.get("/attribute/get-all-attributes", getAllAttributes);

router.get("/attribute/get-attribute/:id", getAttributeById);
router.get("/attribute/get-all-attributes/:id", getattributesbyCategoryId);
router.put("/attribute/update-attribute/:id", updateAttributeById);
router.delete("/attribute/delete-attribute/:id", deleteAttributeById);

module.exports = router;
