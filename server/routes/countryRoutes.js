const router = require("express").Router();
const {
  addCountry,
  deleteCountryById,
  getAllCountries,
  getCountryById,
  updateCountry,
} = require("../controllers/countryControllers");
const authMiddleware = require("../middlewares");

router.get("/country/get-all-countries", authMiddleware, getAllCountries);
router.get("/country/get-country-by-id/:id", authMiddleware, getCountryById);
router.put("/country/update-country/:id", authMiddleware, updateCountry);
router.post("/country/add-country", authMiddleware, addCountry);
router.delete("/country/delete-country/:id", authMiddleware, deleteCountryById);

module.exports = router;
