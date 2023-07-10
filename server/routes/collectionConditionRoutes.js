const router = require("express").Router();
const {
  createCollectionCondition,
  deleteCollectionCondition,
  getAllCollectionConditions,
  getCollectionConditionById,
  updateCollectionConditionById,
} = require("../controllers/collectionConditionController");

router.post(
  "/collection-condition/create-collection-condition",
  createCollectionCondition
);

router.get(
  "/collection-condition/get-all-collection-conditions",
  getAllCollectionConditions
);

router.get(
  "/collection-condition/get-collection-condition-by-id/:id",
  getCollectionConditionById
);

router.put(
  "/collection-condition/update-collection-condition/:id",
  updateCollectionConditionById
);

router.delete(
  "/collection-condition/delete-collection-condition/:id",
  deleteCollectionCondition
);

module.exports = router;
