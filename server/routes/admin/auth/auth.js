const express = require("express");
const AuthController = require("../../../controllers/admin/auth/authController");
const { tryCatch } = require("../../../utils/tryCatch");
const errorHandler = require("../../../middleware/errorhandler");
const { checkLoginOrNot } = require("../../../middleware/auth");
const authRoutes = express.Router();

authRoutes.get("/welcome", function (req, res) {
  res.send("its a welcome route");
});

const auth = new AuthController();
authRoutes.post("/register", tryCatch(auth.register), errorHandler);
authRoutes.post("/login", tryCatch(auth.login), errorHandler);
authRoutes.put(
  "/changePassword",
  checkLoginOrNot,
  tryCatch(auth.changePassword),
  errorHandler
);

module.exports = authRoutes;
