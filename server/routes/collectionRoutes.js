const router = require("express").Router();
const {
  getRawDataForFilter,
  createCollection,
  deleteCollectionById,
  getAllCollections,
  getCollectionById,
  updateCollectionById,
} = require("../controllers/collectionController");
const authMiddleware = require("../middlewares");

router.delete(
  "/collection/delete-collection-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteCollectionById
);
router.post(
  "/collection/filter-data",
  authMiddleware(["vendor", "admin", "customer"]),
  getRawDataForFilter
);
router.post(
  "/collection/create-collection",
  authMiddleware(["vendor", "admin", "customer"]),
  createCollection
);
router.get(
  "/collection/get-all-collections",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCollections
);
router.get(
  "/collection/get-collection-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCollectionById
);
router.put(
  "/collection/update-collection-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateCollectionById
);

module.exports = router;
