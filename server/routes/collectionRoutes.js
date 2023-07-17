const router = require("express").Router();
const {
  getRawDataForFilter,
  createCollection,
  deleteCollectionById,
  getAllCollections,
  getCollectionById,
  updateCollectionById,
} = require("../controllers/collectionController");

router.post("/collection/filter-data", getRawDataForFilter);
router.post("/collection/create-collection", createCollection);
router.get("/collection/get-all-collections", getAllCollections);
router.get("/collection/get-collection-by-id/:id", getCollectionById);
router.put("/collection/update-collection-by-id/:id", updateCollectionById);
router.delete("collection/delete-collection-by-id/:id", deleteCollectionById);
module.exports = router;
