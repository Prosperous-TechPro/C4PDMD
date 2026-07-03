/**
 * =====================================================
 * SETTINGS CONTROLLER
 * =====================================================
 * Handles Organization Settings Requests
 * =====================================================
 */

const settingsService = require("../services/settingsService");

/**
 * =====================================================
 * GET SETTINGS
 * =====================================================
 * GET /api/settings
 * =====================================================
 */

const getSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await settingsService.getSettings();

    return res.status(200).json({
      success: true,
      message:
        "Organization settings retrieved successfully.",
      data: settings,
    });
  } catch (error) {
    console.error(
      "Get Settings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve organization settings.",
      error: error.message,
    });
  }
};

/**
 * =====================================================
 * UPDATE SETTINGS
 * =====================================================
 * PUT /api/settings
 * =====================================================
 */

const updateSettings = async (
  req,
  res
) => {
  try {
    const settings =
      await settingsService.updateSettings(
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Organization settings updated successfully.",
      data: settings,
    });
  } catch (error) {
    console.error(
      "Update Settings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update organization settings.",
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
  getSettings,
  updateSettings,
};