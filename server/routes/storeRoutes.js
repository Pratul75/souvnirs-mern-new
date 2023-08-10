const {
  createStore,
  deleteStoreById,
  getStoreById,
  getStores,
  updateStoreById,
} = require("../controllers/storeController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.get("/store/get-all-stores", authMiddleware(["vendor", "admin", "customer"]) getStores);
router.get("/store/get-store/:id", authMiddleware(["vendor", "admin", "customer"]) getStoreById);
router.post("/store/create-store", authMiddleware(["vendor", "admin", "customer"]) createStore);
router.put("/store/update-store/:id", authMiddleware(["vendor", "admin", "customer"]) updateStoreById);
router.delete("/store/delete-store/:id", authMiddleware(["vendor", "admin", "customer"]) deleteStoreById);

module.exports = router;
