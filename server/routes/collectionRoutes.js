const router = require("express").Router();
const { getRawDataForFilter } = require("../controllers/collectionController");

router.post("/collection/filter-data", getRawDataForFilter);

module.exports = router;
