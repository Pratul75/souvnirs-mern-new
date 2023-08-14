const router = require("express").Router();
const {
  addCountry,
  deleteCountryById,
  getAllCountries,
  getCountryById,
  updateCountry,
} = require("../controllers/countryControllers");
const authMiddleware = require("../middlewares");

router.get(
  "/country/get-all-countries",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCountries
);
router.get(
  "/country/get-country-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCountryById
);
router.put(
  "/country/update-country/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateCountry
);
router.post(
  "/country/add-country",
  authMiddleware(["vendor", "admin", "customer"]),
  addCountry
);
router.delete(
  "/country/delete-country/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteCountryById
);

module.exports = router;
