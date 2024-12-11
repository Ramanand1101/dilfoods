const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decodes token to extract user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user, excluding the password field
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next(); // Proceed to the next middleware or route
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Middleware to restrict access to admin-only routes
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") { // Check for 'admin' role
    next(); // Proceed if user is an admin
  } else {
    res.status(403); // Forbidden
    throw new Error("Not authorized as an admin");
  }
};

// Middleware to restrict access to staff-only routes
const staff = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "staff")) {
    next(); // Allow both admin and staff
  } else {
    res.status(403); // Forbidden
    throw new Error("Not authorized as staff");
  }
};

module.exports = { protect, admin, staff };
