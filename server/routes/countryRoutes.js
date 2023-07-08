const router = require("express").Router();
const {
  addCountry,
  deleteCountryById,
  getAllCountries,
  getCountryById,
  updateCountry,
} = require("../controllers/countryControllers");

router.get("/country/get-all-countries", getAllCountries);
router.get("/country/get-country-by-id/:id", getCountryById);
router.put("/country/update-country/:id", updateCountry);
router.post("/country/add-country", addCountry);
router.delete("/country/delete-country/:id", deleteCountryById);

module.exports = router;
