const router = require("express").Router();
const {
  addConditionValue,
  deleteConditionValue,
  getAllConditionValues,
  getConditionValueById,
  updateConditionValue,
} = require("../controllers/conditionValueController");
const authMiddleware = require("../middlewares");

router.post(
  "/condition-value/add-condition-value",
  authMiddleware,
  addConditionValue
);
router.get(
  "/condition-value/get-all-condition-values",
  authMiddleware,
  getAllConditionValues
);
router.get(
  "/condition-value/get-condition-value-by-id/:id",
  authMiddleware,
  getConditionValueById
);
router.put(
  "/condition-value/update-condition-value/:id",
  authMiddleware,
  updateConditionValue
);
router.delete(
  "/condition-value/delete-condition-value/:id",
  authMiddleware,
  deleteConditionValue
);

module.exports = router;
