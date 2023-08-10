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

router.post("/order/add-order", authMiddleware(["vendor", "admin", "customer"]) addOrder);
router.get("/order/get-orders", authMiddleware(["vendor", "admin", "customer"]) getOrders);
router.get("/order/get-order/:id", authMiddleware(["vendor", "admin", "customer"]) getOrder);
router.put("/order/update-order/:id", authMiddleware(["vendor", "admin", "customer"]) updateOrderById);
router.delete("/order/delete-order/:id", authMiddleware(["vendor", "admin", "customer"]) deleteOrder);
// get total sales
router.get("/order/get-total-sales", authMiddleware(["vendor", "admin", "customer"]) getTotalSales);
// get total orders count
router.get("/order/get-total-orders-count", authMiddleware(["vendor", "admin", "customer"]) getTotalOrders);
// get order table data for admin dashboard ui
router.get(
  "/order/get-order-table-data",
  authMiddleware(["vendor", "admin"]),
  getOrderTableData
);
module.exports = router;
