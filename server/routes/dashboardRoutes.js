const { fetchDashboardCardsData, getBarChartData } = require('../controllers/dashboardController')

const router = require('express').Router()

router.get("/dashboard/cards", fetchDashboardCardsData)

router.get("/dashboard/barchart", getBarChartData)
module.exports = router