const {
  addOrder,
  getOrders,
  getOrder,
  updateOrderById,
  deleteOrder,
  getTotalSales,
  getTotalOrders,
  getOrderTableData,
  createOrder,
  captureOrder,
  getShippedOrders,
  getReplaceOrders,
  getAllOrders,
  getShippedOrdersList,
  getReplaceOrdersList,
  getAllOrdersPaymentSuccess,
  OrderByInvoice,
  get_orderCunt,
  recentOrder,
  sendQueryByUser,
  customerPaymentdata,
  getRefundDetailsUser,
} = require("../controllers/ordersController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.post(
  "/order/add-order",
  authMiddleware(["vendor", "admin", "customer"]),
  addOrder
);

router.get(
  "/cutomer/payment/success/order",
  authMiddleware(["vendor", "admin", "customer"]),
  customerPaymentdata
);

router.get(
  "/cutomer/refund/list/order",
  authMiddleware(["customer"]),
  getRefundDetailsUser
);

router.post(
  "/post/query/user/side",
  authMiddleware(["vendor", "admin", "customer"]),
  sendQueryByUser
);

router.get(
  "/order/recent/list",
  authMiddleware(["vendor", "admin", "customer"]),
  recentOrder
);

router.get(
  "/order/all/count",
  authMiddleware(["vendor", "admin", "customer"]),
  get_orderCunt
);
router.post(
  "/get/invoice/order/details",
  authMiddleware(["vendor", "admin", "customer"]),
  OrderByInvoice
);

router.get(
  "/order/get-orders",
  authMiddleware(["vendor", "admin", "customer"]),
  getOrders
);

router.get(
  "/order/payment/success/get-orders",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllOrdersPaymentSuccess
);

router.get(
  "/order/shipped/get-orders/list",
  authMiddleware(["vendor", "admin", "customer"]),
  getShippedOrdersList
);

router.get(
  "/order/replace/get-orders/list",
  authMiddleware(["vendo?r", "admin", "customer"]),
  getReplaceOrdersList
);

router.get(
  "/order/get-order-table-data",
  authMiddleware(["vendor", "admin", "customer"]),
  getOrderTableData
);

router.get(
  "/order/all/get-orders",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllOrders
);

router.get(
  "/order/get/shipped-orders",
  authMiddleware(["vendor", "admin", "customer"]),
  getShippedOrders
);
router.get(
  "/order/get/replace-orders",
  authMiddleware(["vendor", "admin", "customer"]),
  getReplaceOrders
);
getReplaceOrders;
router.get(
  "/order/get-order/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getOrder
);
router.put(
  "/order/update-order/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateOrderById
);
router.delete(
  "/order/delete-order/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteOrder
);
// get total sales
router.get(
  "/order/get-total-sales",
  authMiddleware(["vendor", "admin", "customer"]),
  getTotalSales
);
// get total orders count
router.get(
  "/order/get-total-orders-count",
  authMiddleware(["vendor", "admin", "customer"]),
  getTotalOrders
);
// get order table data for admin dashboard ui

router.post("/order/create", authMiddleware(["customer"]), createOrder);
router.post("/order/capture/:paymentId", captureOrder);
module.exports = router;
