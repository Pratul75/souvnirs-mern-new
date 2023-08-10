const router = require("express").Router();
const {
  createCollectionCondition,
  deleteCollectionCondition,
  getAllCollectionConditions,
  getCollectionConditionById,
  updateCollectionConditionById,
} = require("../controllers/collectionConditionController");
const authMiddleware = require("../middlewares");

router.post(
  "/collection-condition/create-collection-condition",
  authMiddleware,
  createCollectionCondition
);

router.get(
  "/collection-condition/get-all-collection-conditions",
  authMiddleware,
  getAllCollectionConditions
);

router.get(
  "/collection-condition/get-collection-condition-by-id/:id",
  authMiddleware,
  getCollectionConditionById
);

router.put(
  "/collection-condition/update-collection-condition/:id",
  authMiddleware,
  updateCollectionConditionById
);

router.delete(
  "/collection-condition/delete-collection-condition/:id",
  authMiddleware,
  deleteCollectionCondition
);

module.exports = router;
