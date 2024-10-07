// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { signup, login, googleLogin } = require("../controllers/authControllers");

// Routes beginning with /api/auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin); // Google login route

module.exports = router;
