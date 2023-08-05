const multer = require("multer");
const path = require("path");
const { v2 } = require("cloudinary");


v2.config({
    cloud_name: "dam52mxjw",
    api_key: "139432637778695",
    api_secret: "2YSusShhhMpU3RXI6EkYN95VwIM",
});


// export default v2;
const upload = multer({
    storage: multer.diskStorage({}),
    filename: function (req, file, cb) {

        const uniqueFileName = Date.now().toString() + file.originalname
        cb(null, uniqueFileName)
    }
});
module.exports = { v2, upload }