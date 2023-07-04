const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const { connect } = require("./db/db");
const productRoutes = require("./routes/productRoutes");
const vendorRoutes = require("./routes/vendorRoutes");

// app initialization
const app = express();
// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
// connect to db
connect();

// routes
app.use(productRoutes);
app.use(vendorRoutes);

// start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
