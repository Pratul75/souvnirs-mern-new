const {
  addAttributeType,
  deleteAttributeType,
  getAllAttributeTypes,
  getAttributeTypeById,
  updateAttributeType,
} = require("../controllers/attributeTypeController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();
router.get(
  "/attribute-type/get-all-attribute-types",
  authMiddleware(["admin"]),
  getAllAttributeTypes
);
router.get(
  "/attribute-type/get-attribute-type-by-id/:id",
  authMiddleware(["admin"]),
  getAttributeTypeById
);
router.post(
  "/attribute-type/add-attribute-type",
  authMiddleware(["admin"]),
  addAttributeType
);
router.put(
  "/attribute-type/update-attribute-type/:id",
  authMiddleware(["admin"]),
  updateAttributeType
);
router.delete(
  "/attribute-type/delete-attribute-type/:id",
  authMiddleware(["admin"]),
  deleteAttributeType
);

module.exports = router;
