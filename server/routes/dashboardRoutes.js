const { fetchDashboardCardsData, getBarChartData, getProductDataForAdmin, getXls } = require('../controllers/dashboardController')
const authMiddleware = require('../middlewares')

const router = require('express').Router()

router.get("/dashboard/cards", authMiddleware, fetchDashboardCardsData)

router.get("/dashboard/barchart", authMiddleware, getBarChartData)
router.get("/dashboard/products", authMiddleware, getProductDataForAdmin)
router.get("/xls", getXls)
module.exports = router