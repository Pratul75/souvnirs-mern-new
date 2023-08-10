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
  authMiddleware(["vendor", "admin", "customer"])
  addConditionValue
);
router.get(
  "/condition-value/get-all-condition-values",
  authMiddleware(["vendor", "admin", "customer"])
  getAllConditionValues
);
router.get(
  "/condition-value/get-condition-value-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"])
  getConditionValueById
);
router.put(
  "/condition-value/update-condition-value/:id",
  authMiddleware(["vendor", "admin", "customer"])
  updateConditionValue
);
router.delete(
  "/condition-value/delete-condition-value/:id",
  authMiddleware(["vendor", "admin", "customer"])
  deleteConditionValue
);

module.exports = router;
