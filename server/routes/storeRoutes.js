const {
  createStore,
  deleteStoreById,
  getStoreById,
  getStores,
  updateStoreById,
} = require("../controllers/storeController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.get("/store/get-all-stores", authMiddleware, getStores);
router.get("/store/get-store/:id", authMiddleware, getStoreById);
router.post("/store/create-store", authMiddleware, createStore);
router.put("/store/update-store/:id", authMiddleware, updateStoreById);
router.delete("/store/delete-store/:id", authMiddleware, deleteStoreById);

module.exports = router;
