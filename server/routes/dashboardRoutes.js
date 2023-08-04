const { fetchDashboardCardsData, getBarChartData, getProductDataForAdmin, getDoughNutChartData } = require('../controllers/dashboardController')
const authMiddleware = require('../middlewares')

const router = require('express').Router()

router.get("/dashboard/cards", authMiddleware, fetchDashboardCardsData)

router.get("/dashboard/barchart", authMiddleware, getBarChartData)
router.get("/dashboard/products", authMiddleware, getProductDataForAdmin)
router.get("/dashboard/doughnutchart", authMiddleware, getDoughNutChartData)
module.exports = router