const {
  addOrder,
  getOrders,
  getOrder,
  updateOrderById,
  deleteOrder,
  getTotalSales,
  getTotalOrders,
} = require("../controllers/ordersController");

const router = require("express").Router();

router.post("/order/add-order", addOrder);
router.get("/order/get-orders", getOrders);
router.get("/order/get-order/:id", getOrder);
router.put("/order/update-order/:id", updateOrderById);
router.delete("/order/delete-order/:id", deleteOrder);
// get total sales
router.get("/order/get-total-sales", getTotalSales);
// get total orders count
router.get("/order/get-total-orders-count", getTotalOrders);
module.exports = router;
