const {
  addOrder,
  getOrders,
  getOrder,
  updateOrderById,
  deleteOrder,
} = require("../controllers/ordersController");

const router = require("express").Router();

router.post("/orders/add-order", addOrder);
router.get("/order/get-orders", getOrders);
router.get("/order/get-order/:id", getOrder);
router.put("/order/update-order/:id", updateOrderById);
router.delete("/order/delete-order/:id", deleteOrder);

module.exports = router;
