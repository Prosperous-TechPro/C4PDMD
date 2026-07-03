/**
 * =====================================================
 * DASHBOARD CONTROLLER
 * =====================================================
 * Handles all Dashboard HTTP requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const {
  getDashboardStatistics,
  getDashboardCharts,
  getRecentActivities,
} = require("../services/dashboardService");

/**
 * =====================================================
 * GET DASHBOARD STATISTICS
 * =====================================================
 * GET /api/dashboard/stats
 */

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const statistics =
      await getDashboardStatistics();

    return res.status(200).json({
      success: true,
      message:
        "Dashboard statistics retrieved successfully.",
      data: statistics,
    });
  } catch (error) {
    console.error(
      "DASHBOARD STATISTICS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve dashboard statistics.",
      error: error.message,
    });
  }
};

/**
 * =====================================================
 * GET DASHBOARD CHARTS
 * =====================================================
 * GET /api/dashboard/charts
 */

const getDashboardChartData =
  async (req, res) => {
    try {
      const charts =
        await getDashboardCharts();

      return res.status(200).json({
        success: true,
        message:
          "Dashboard chart data retrieved successfully.",
        data: charts,
      });
    } catch (error) {
      console.error(
        "DASHBOARD CHART ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to retrieve dashboard chart data.",
        error: error.message,
      });
    }
  };

/**
 * =====================================================
 * GET RECENT ACTIVITIES
 * =====================================================
 * GET /api/dashboard/recent
 */

const getRecentDashboardActivities =
  async (req, res) => {
    try {
      const activities =
        await getRecentActivities();

      return res.status(200).json({
        success: true,
        message:
          "Recent activities retrieved successfully.",
        data: activities,
      });
    } catch (error) {
      console.error(
        "RECENT ACTIVITIES ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to retrieve recent activities.",
        error: error.message,
      });
    }
  };

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getDashboardStats,
  getDashboardChartData,
  getRecentDashboardActivities,
};