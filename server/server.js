require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db/db");
const helmet = require("helmet");
// route imports
const productRoutes = require("./routes/productRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const storeRoutes = require("./routes/storeRoutes");
const customerRoutes = require("./routes/customerRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const attributeRoutes = require("./routes/attributeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const attributeTypeRoutes = require("./routes/attributeTypeRoutes");
const productReviewRoutes = require("./routes/productReviewRoutes");
const countryRoutes = require("./routes/countryRoutes");
const collectionConditions = require("./routes/collectionConditionRoutes");
const cartRoutes = require("./routes/cartRoutes");
const refundRoutes = require("./routes/refundRoutes");
const conditionValueRoutes = require("./routes/conditionValueRoutes");

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
app.use(customerRoutes);
// address routes
app.use(addressRoutes);
// order routes
app.use(orderRoutes);
// attribute routes
app.use(attributeRoutes);
// category routes
app.use(categoryRoutes);
// attributeType routes
app.use(attributeTypeRoutes);
// product review routes
app.use(productReviewRoutes);
// country routes
app.use(countryRoutes);
// collection condition routes
app.use(collectionConditions);
// cart routes
app.use(cartRoutes);
// refund routes
app.use(refundRoutes);
// condition values routes
app.use(conditionValueRoutes);

// start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
