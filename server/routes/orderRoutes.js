const {
  addOrder,
  getOrders,
  getOrder,
  updateOrderById,
  deleteOrder,
  getTotalSales,
  getTotalOrders,
  getOrderTableData,
} = require("../controllers/ordersController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.post("/order/add-order", authMiddleware, addOrder);
router.get("/order/get-orders", authMiddleware, getOrders);
router.get("/order/get-order/:id", authMiddleware, getOrder);
router.put("/order/update-order/:id", updateOrderById);
router.delete("/order/delete-order/:id", deleteOrder);
// get total sales
router.get("/order/get-total-sales", authMiddleware, getTotalSales);
// get total orders count
router.get("/order/get-total-orders-count", authMiddleware, getTotalOrders);
// get order table data for admin dashboard ui
router.get("/order/get-order-table-data", authMiddleware, getOrderTableData);
module.exports = router;
