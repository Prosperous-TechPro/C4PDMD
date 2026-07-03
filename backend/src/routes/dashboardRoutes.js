/**
 * =====================================================
 * DASHBOARD ROUTES
 * =====================================================
 * Handles all Dashboard API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

/**
 * =====================================================
 * IMPORT CONTROLLERS
 * =====================================================
 */

const {
  getDashboardStats,
  getDashboardChartData,
  getRecentDashboardActivities,
} = require("../controllers/dashboardController");

/**
 * =====================================================
 * DASHBOARD ROUTES
 * =====================================================
 */

/**
 * GET DASHBOARD STATISTICS
 * GET /api/dashboard/stats
 */
router.get(
  "/stats",
  getDashboardStats
);

/**
 * GET DASHBOARD CHART DATA
 * GET /api/dashboard/charts
 */
router.get(
  "/charts",
  getDashboardChartData
);

/**
 * GET RECENT ACTIVITIES
 * GET /api/dashboard/recent
 */
router.get(
  "/recent",
  getRecentDashboardActivities
);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;