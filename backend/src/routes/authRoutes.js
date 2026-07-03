/**
 * =====================================================
 * AUTH ROUTES
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  login,
} = require("../controllers/authController");

const {
  me,
  updateMe,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  register,
  verifyRegistrationOtp,
} = require("../controllers/authController");

const authenticate = require("../middleware/authMiddleware");

/**
 * Login
 * POST /api/auth/login
 */

router.post("/login", login);

// register
router.post("/register", register);

// verify registration otp
router.post("/verify-registration-otp", verifyRegistrationOtp);

// refresh
router.post("/refresh", refresh);

// logout
router.post("/logout", logout);

// me (protected)
router.get("/me", authenticate, me);
router.put("/me", authenticate, updateMe);

// forgot / reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;