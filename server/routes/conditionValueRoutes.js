const router = require("express").Router();
const {
  addConditionValue,
  deleteConditionValue,
  getAllConditionValues,
  getConditionValueById,
  updateConditionValue,
} = require("../controllers/conditionValueController");

router.post("/condition-value/add-condition-value", addConditionValue);
router.get("/condition-value/get-all-condition-values", getAllConditionValues);
router.get(
  "/condition-value/get-condition-value-by-id/:id",
  getConditionValueById
);
router.put("/condition-value/update-condition-value/:id", updateConditionValue);
router.delete(
  "/condition-value/delete-condition-value/:id",
  deleteConditionValue
);

module.exports = router;
