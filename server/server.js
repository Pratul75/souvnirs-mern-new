require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db/db");
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
const dashboardRoutes = require("./routes/dashboardRoutes")
const conditionValueRoutes = require("./routes/conditionValueRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const discountRoutes = require("./routes/discountRoutes");
const couponRoutes = require("./routes/couponRoutes");
const authRoutes = require("./auth/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const morgan = require("morgan");

// app initialization
const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
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
// collection routes
app.use(collectionRoutes);
// discount routes
app.use(discountRoutes);
// coupon routes
app.use(couponRoutes);
// auth routes
app.use(authRoutes);
// admin routes
app.use(wishlistRoutes);

// admin routes should only be exposed when its required to create a new admin, else it should be commented out
app.use(adminRoutes);

app.use(dashboardRoutes);

// start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
