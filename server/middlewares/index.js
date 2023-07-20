// Verify middleware to protect the API routes
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Add the decoded user information to the request object for future use
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
