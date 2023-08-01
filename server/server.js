require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db/db");
const helmet = require("helmet");
// route imports
const productRoutes = require("./Routes/productRoutes");
const vendorRoutes = require("./Routes/vendorRoutes");
const storeRoutes = require("./Routes/storeRoutes");
const customerRoutes = require("./Routes/customerRoutes");
const addressRoutes = require("./Routes/addressRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const attributeRoutes = require("./Routes/attributeRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const attributeTypeRoutes = require("./Routes/attributeTypeRoutes");
const productReviewRoutes = require("./Routes/productReviewRoutes");
const countryRoutes = require("./Routes/countryRoutes");
const collectionConditions = require("./Routes/collectionConditionRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const refundRoutes = require("./Routes/refundRoutes");
const conditionValueRoutes = require("./Routes/conditionValueRoutes");
const collectionRoutes = require("./Routes/collectionRoutes");
const discountRoutes = require("./Routes/discountRoutes");
const couponRoutes = require("./Routes/couponRoutes");
const authRoutes = require("./auth/authRoutes");
const adminRoutes = require("./Routes/adminRoutes");

// app initialization
const app = express();
// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
// connect to db
connect();

app.get("/",(req,res)=>{res.status(200).send("welcome to souvnirs backend")})
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

// admin routes should only be exposed when its required to create a new admin, else it should be commented out
app.use(adminRoutes);

// start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
