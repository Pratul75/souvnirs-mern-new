const {
  addAttributeType,
  deleteAttributeType,
  getAllAttributeTypes,
  getAttributeTypeById,
  updateAttributeType,
} = require("../controllers/attributeTypeController");

const router = require("express").Router();
router.get("/attribute-type/get-all-attribute-types", getAllAttributeTypes);
router.get(
  "/attribute-type/get-attribute-type-by-id/:id",
  getAttributeTypeById
);
router.post("/attribute-type/add-attribute-type", addAttributeType);
router.put("/attribute-type/update-attribute-type/:id", updateAttributeType);
router.delete("/attribute-type/delete-attribute-type/:id", deleteAttributeType);

module.exports = router;
