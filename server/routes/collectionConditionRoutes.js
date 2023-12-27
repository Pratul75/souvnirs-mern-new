const router = require("express").Router();
const {
  createCollectionCondition,
  deleteCollectionCondition,
  getAllCollectionConditions,
  getCollectionConditionById,
  updateCollectionConditionById,
  getAllCollectionConditionsList,
} = require("../controllers/collectionConditionController");
const authMiddleware = require("../middlewares");

router.post(
  "/collection-condition/create-collection-condition",
  authMiddleware(["vendor", "admin", "customer"]),
  createCollectionCondition
);

router.get(
  "/collection-condition/get-all-collection-conditions",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCollectionConditions
);

router.get(
  "/collection-condition/get-all-collection-conditions/list",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCollectionConditionsList
);

router.get(
  "/collection-condition/get-collection-condition-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCollectionConditionById
);

router.put(
  "/collection-condition/update-collection-condition/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateCollectionConditionById
);

router.delete(
  "/collection-condition/delete-collection-condition/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteCollectionCondition
);

module.exports = router;
