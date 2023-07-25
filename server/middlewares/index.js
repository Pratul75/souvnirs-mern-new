// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = "aspdijr230wefn203wqiokn_eww9rijn"; // Replace this with your actual secret key

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token found, authorization denied" });
  }

  try {
    // Verify the token and extract the payload data
    const decoded = jwt.verify(token, secretKey);

    // You can perform additional checks or attach the user data to the request for future use
    req.userId = decoded.id; // Assuming the token payload contains a 'user' field
    req.role = decoded.role; // Assuming the role payload contains a 'role' field

    // Call the next middleware or route handler
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token, authorization denied" });
  }
};

module.exports = authMiddleware;
