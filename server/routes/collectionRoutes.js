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
  authMiddleware,
  deleteCollectionById
);
router.post("/collection/filter-data", authMiddleware, getRawDataForFilter);
router.post("/collection/create-collection", authMiddleware, createCollection);
router.get(
  "/collection/get-all-collections",
  authMiddleware,
  getAllCollections
);
router.get(
  "/collection/get-collection-by-id/:id",
  authMiddleware,
  getCollectionById
);
router.put(
  "/collection/update-collection-by-id/:id",
  authMiddleware,
  updateCollectionById
);

module.exports = router;
