const multer = require("multer");
const path = require("path");
const { v2 } = require("cloudinary");

v2.config({
  cloud_name: "dam52mxjw",
  api_key: "139432637778695",
  api_secret: "2YSusShhhMpU3RXI6EkYN95VwIM",
});

// Specify your server's upload folder
const uploadPath = path.join(__dirname, "uploads"); // Change "uploads" to your desired folder name

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cb) {
      const uniqueFileName = Date.now().toString() + file.originalname;
      cb(null, uniqueFileName);
    },
  }),
});

module.exports = { v2, upload };

// {
//   "type": "service_account",
//   "project_id": "souvnirs-be",
//   "private_key_id": "d2a202434217d2465183525c1d6d19532a504157",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRHLDiVqUyY1dC\nPNXcXH/H0P4TDkzaGSCyTO8R7rQGkf2Zo2siyUyS9dUUoKRrp9Vtc3wrTs72FiSH\njhIZhcOFp9RhrVOc5JTKKP0YCwttMe1qatK7qngpyHvXKDfhg6PsaiXHmsUKEfaA\nTPdFk9N7MKTJ8jFUTYgZkrbSSR4uwjNAWfnNAITwu93yQI2i1qBCKlT24vGzlgS8\nhBwsPS+MGecW60QYokVLVfJteaPdHE42mZtkOZhnchevUTl8Xb8h5Bm+biHz4V3C\nnC1dnOt2aiMeaA39+RSXbFZKQ+NfTIFMxXSLus9UgiIX6Gf9XvqwmyWaDaOcjso5\nRfcNHTYTAgMBAAECggEALu31dJZldK1+w8rLZC0OMFXi73viG4BQKjPB45BirqbM\n91IJlUEAAmtRatOyksaTy4CDeWSyZeAKSrHDth6jBrfnnhQ8E5XpHoWcZ2zzH4p4\n8c0PhjZ3yUjJIjxQbjgQ7dnUqLs/RUdKvviG9gJ7D8aW9Qt5rqXHyZV3mjH2qB9d\nbv1btruONBv9hYbx/MRSLxkXN+bYaSfqR+6kJtfxiYFxP987Mt0y/F13GvtXc7FS\nnLQNZOpMZjO7uIFJHgcFDkOpgQUFTe4+Ama2luP9JaUxzcyzTu4S580oasJ5/cSm\ns1wKHby3dgOWFfNvMZcXS0vLVV8OS/8KIEAn+w+fgQKBgQDoPKO10iH7uV8v2P+p\ndmksavKioUM8ygflkOXt2SCANUEyB7vaHUCdndiy5DoLXRBPvDYIfY7hBd+Hyd2e\nBHDYz52WeUXkrB8C1uF/We/9tCdY/nrCptCmP6Pe47FJG485HsV3Qbj3KCF09lFP\nU1OJF4T53CcHkatUTPnm45wEsQKBgQDmgk5F27D8p8Np6Y3m0v4lLY+6ZLImrLMr\noqfJjkoAkBfyGEwdSqyJOcUJpBR1FFQDPyn1v1X2qKd8Hpf9yWF2fHQwVqhxTmGU\n55vjvA8qKYoFvRb6hApAtTbz4t39eL7OM6lIzEpMz++tl4Dd9IAdYiu1OZPVtL4t\nCor/U8WoAwKBgQCBB4/9qS5waWHVd780LDHrF9CPQwHUeHtCtOrK52QDV5NNdLaO\nTMplyBlp6xvEzIQPiQaMWRZVN6omC6Yx8U2xaEiqHd8TWf4w2aqX0yRf1QQ3kcwq\n8fvjImCtqdwKPmGo3svfoohd6dIM5f3vEODMvmCHYiXdMrX6NHp0Kem5QQKBgAnS\n2dUeVL+fwrM70eFZcp1RAMQX0IPXbldYuj/bwYmemnal1HCXIx1CCgSsKncG48Gz\nqm0ft2EotOKURzP4ph+vlCAPQWR6y6vV5w3gkODiHlC6S0Vn5Sv2zR29uGo6AB+3\nkepZUn1Ni1BhmYtcBS27ZlN13bgI2OYAggX5ov3TAoGBAKqQkwtov9JT7D4Fzelh\nHbBqlZd6kIYL0QCclYzgsmwVr9k4V1yjkzm3b+sbhUKBCTkspZzJhKN6mDaQOZdY\nq9I6UM94wz070uUEjZnauTS/qd8TX8Y4KJqjDLSCUpIkiCO7e7CIBFwKo9SyA+Xy\nmU/rtnWNWPfkPxFSNPKS02pt\n-----END PRIVATE KEY-----\n",
//   "client_email": "souvnirs-be@appspot.gserviceaccount.com",
//   "client_id": "103569642985415713446",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/souvnirs-be%40appspot.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }
