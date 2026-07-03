/**
 * =====================================================
 * PARTNER CONTROLLER
 * =====================================================
 * Handles all Partner HTTP requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const partnerService = require("../services/partnerService");

/**
 * =====================================================
 * GET ALL PARTNERS
 * =====================================================
 */

const getAllPartners = async (req, res) => {
  try {
    const partners =
      await partnerService.getAllPartners();

    return res.status(200).json({
      success: true,
      count: partners.length,
      data: partners,
    });
  } catch (error) {
    console.error(
      "GET PARTNERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * GET PARTNER BY ID
 * =====================================================
 */

const getPartnerById = async (req, res) => {
  try {
    const partner =
      await partnerService.getPartnerById(
        req.params.id
      );

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: partner,
    });
  } catch (error) {
    console.error(
      "GET PARTNER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * CREATE PARTNER
 * =====================================================
 */

const createPartner = async (req, res) => {
  try {
    const partner =
      await partnerService.createPartner(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Partner created successfully.",
      data: partner,
    });
  } catch (error) {
    console.error(
      "CREATE PARTNER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * UPDATE PARTNER
 * =====================================================
 */

const updatePartner = async (req, res) => {
  try {
    const partner =
      await partnerService.updatePartner(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Partner updated successfully.",
      data: partner,
    });
  } catch (error) {
    console.error(
      "UPDATE PARTNER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * DELETE PARTNER
 * =====================================================
 */

const deletePartner = async (req, res) => {
  try {
    await partnerService.deletePartner(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Partner deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE PARTNER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
};