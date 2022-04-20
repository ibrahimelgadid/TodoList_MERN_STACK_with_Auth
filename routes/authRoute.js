//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const express = require("express");
const router = express.Router();

//---------------------------------------------|
//           Import controllers
//---------------------------------------------|
const { register, login } = require("../contollers/authController");
const { protect } = require("../middleware/authMiddleware");

//---------------------------------------------|
//              Registration routes
//---------------------------------------------|

// @route /auth/register
// @access public
//@type post
router.route("/register").post(register);

// @route /auth/login
// @access public
//@type post
router.route("/login").post(login);

module.exports = router;
