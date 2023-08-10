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

router.post(
  "/attribute/add-attribute",
  authMiddleware(["admin"]),
  addAttribute
);
router.get(
  "/attribute/get-all-attributes",
  authMiddleware(["vendor", "admin"]),
  getAllAttributes
);

router.get(
  "/attribute/get-attribute/:id",
  authMiddleware(["vendor", "admin"]),
  getAttributeById
);
router.get(
  "/attribute/get-all-attributes/:id",
  authMiddleware(["vendor", "admin"]),
  getattributesbyCategoryId
);
router.put(
  "/attribute/update-attribute/:id",
  authMiddleware(["admin"]),
  updateAttributeById
);
router.delete(
  "/attribute/delete-attribute/:id",
  authMiddleware(["admin"]),
  deleteAttributeById
);

module.exports = router;
