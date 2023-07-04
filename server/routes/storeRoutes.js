const {
  createStore,
  deleteStoreById,
  getStoreById,
  getStores,
  updateStoreById,
} = require("../controllers/storeController");

const router = require("express").Router();

router.get("/store/get-all-stores", getStores);
router.get("/store/get-store/:id", getStoreById);
router.post("/store/create-store", createStore);
router.put("/store/update-store/:id", updateStoreById);
router.delete("/store/delete-store/:id", deleteStoreById);

module.exports = router;
