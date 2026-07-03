/**
 * =====================================================
 * SETTINGS ROUTES
 * =====================================================
 * Organization Settings Routes
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

// Optional middleware (uncomment when authentication is ready)
// const authenticate = require("../middleware/authMiddleware");
// const authorize = require("../middleware/roleMiddleware");

/**
 * =====================================================
 * SETTINGS ROUTES
 * =====================================================
 */

/**
 * -----------------------------------------------------
 * GET ORGANIZATION SETTINGS
 * GET /api/settings
 * Public route
 * -----------------------------------------------------
 */

router.get(
  "/",
  getSettings
);

/**
 * -----------------------------------------------------
 * UPDATE ORGANIZATION SETTINGS
 * PUT /api/settings
 * Protected route (Admin)
 * -----------------------------------------------------
 */

router.put(
  "/",
  // authenticate,
  // authorize("Admin"),
  updateSettings
);

module.exports = router;