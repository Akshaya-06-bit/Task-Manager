const jwt = require("jsonwebtoken");
const User = require("../models/User");

// This middleware runs before any protected route handler
// It checks that the request has a valid JWT token in the Authorization header
const protect = async (req, res, next) => {
  try {
    // The frontend sends the token as: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Extract the token part after "Bearer "
    const token = authHeader.split(" ")[1];

    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user (without password) to the request object
    // This lets route handlers know which user is making the request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    next(); // Token is valid — continue to the route handler
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = { protect };
