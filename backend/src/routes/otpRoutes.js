/**
 * =====================================================
 * OTP ROUTES
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  sendOTPController,
  verifyOTPController
} =
require("../controllers/otpController");

/**
 * Send OTP
 */

router.post(
  "/send",
  sendOTPController
);

/**
 * Verify OTP
 */

router.post(
  "/verify",
  verifyOTPController
);

module.exports = router;