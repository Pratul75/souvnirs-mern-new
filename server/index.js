require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const DBconnection = require("./config/DB");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/admin/auth/auth");

// DB start
DBconnection();

// middleware
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(400).send("Welcome to Backend");
});

// middleware
app.use(cookieParser());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);



app.listen(process.env.PORT, () => {
  console.log("Server is running", process.env.PORT);
});
