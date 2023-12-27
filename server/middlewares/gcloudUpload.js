const path = require("path");
const multer = require("multer");
const { v2 } = require("cloudinary");
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");

v2.config({
  cloud_name: "dam52mxjw",
  api_key: "139432637778695",
  api_secret: "2YSusShhhMpU3RXI6EkYN95VwIM",
});

const gc = new Storage({
  keyFilename: path.join(__dirname, "souvnirs-be-4456a487ee0c.json"),
  projectId: "souvnirs-be",
});

const coolfilesBucket = gc.bucket("staging.souvnirs-be.appspot.com");

const upload = multer({
  storage: multer.diskStorage({
    // destination: uploadPath,
    filename: function (req, file, cb) {
      const uniqueFileName = Date.now().toString() + file.originalname;
      cb(null, uniqueFileName);
    },
  }),
});

const handleGCSUpload = (req, res, next) => {
  // Use upload middleware
  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    console.log("+++>", req.files);

    // Upload each file to Google Cloud Storage
    const files = req.files;
    const uploadPromises = files.map((file) => {
      const destination = file.filename;
      return coolfilesBucket.upload(file.path, {
        destination: destination,
      });
    });

    // Wait for all uploads to complete
    Promise.all(uploadPromises)
      .then(() => {
        // Clean up local uploads
        files.forEach((file) => {
          fs.unlinkSync(file.path);
        });
        if (Array.isArray(req.files)) {
          if (req.files.length == 1) {
            req.file = req.files[0];
          } else {
            req.files = req.files;
          }
        }
        next();
      })
      .catch((error) => {
        return res.status(500).json({
          error: "Failed to upload files to Google Cloud Storage",
          msg: error.message,
        });
      });
  });
};

module.exports = { handleGCSUpload };
