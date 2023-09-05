const {
  fetchDashboardCardsData,
  getBarChartData,
  getProductDataForAdmin,
  getDoughNutChartData,
} = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

router.get(
  "/dashboard/cards",
  authMiddleware(["vendor", "admin", "customer"]),
  fetchDashboardCardsData
);

router.get(
  "/dashboard/barchart",
  // authMiddleware(["vendor", "admin", "customer"]),
  getBarChartData
);

router.get(
  "/dashboard/products",
  authMiddleware(["vendor", "admin", "customer"]),
  getProductDataForAdmin
);
router.get(
  "/dashboard/doughnutchart",
  authMiddleware(["vendor", "admin", "customer"]),
  getDoughNutChartData
);
module.exports = router;
