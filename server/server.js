const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const { connect } = require("./db/db");
const productRoutes = require("./routes/productRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const storeRoutes = require("./routes/storeRoutes");
const customerRoutes = require("./routes/customerRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const attributeRoutes = require("./routes/attributeRoutes");

// app initialization
const app = express();
// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
// connect to db
connect();

// routes
// product routes
app.use(productRoutes);
// vendor routes
app.use(vendorRoutes);
// store routes
app.use(storeRoutes);
// customer routes
// customer is end user
app.use(customerRoutes);
// address routes
app.use(addressRoutes);
// order routes
app.use(orderRoutes);
// attribute routes
app.use(attributeRoutes);

// start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
