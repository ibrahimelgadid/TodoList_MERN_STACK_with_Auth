const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Auth.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401).json({ privilegesErr: "not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ privilegesErr: "not authorized, no token" });
  }
});

module.exports = { protect };
