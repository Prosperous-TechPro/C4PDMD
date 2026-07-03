/**
 * =====================================================
 * DONATION CONTROLLER
 * =====================================================
 * Handles all Donation HTTP requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const donationService = require("../services/donationService");

const sendErrorResponse = (res, error) => {
  const payload = {
    success: false,
    message: error.message,
  };

  if (error.errors) {
    payload.errors = error.errors;
  }

  return res.status(error.statusCode || 500).json(payload);
};

/**
 * =====================================================
 * GET ALL DONATIONS
 * =====================================================
 */

const getAllDonations = async (req, res) => {
  try {
    const donations =
      await donationService.getAllDonations();

    return res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    console.error(
      "GET DONATIONS ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * GET DONATION BY ID
 * =====================================================
 */

const getDonationById = async (req, res) => {
  try {
    const donation =
      await donationService.getDonationById(
        req.params.id
      );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error(
      "GET DONATION ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * CREATE DONATION
 * =====================================================
 */

const createDonation = async (req, res) => {
  try {
    const donation =
      await donationService.createDonation(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Donation recorded successfully.",
      data: donation,
    });
  } catch (error) {
    console.error(
      "CREATE DONATION ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * UPDATE DONATION
 * =====================================================
 */

const updateDonation = async (req, res) => {
  try {
    const donation =
      await donationService.updateDonation(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Donation updated successfully.",
      data: donation,
    });
  } catch (error) {
    console.error(
      "UPDATE DONATION ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * DELETE DONATION
 * =====================================================
 */

const deleteDonation = async (req, res) => {
  try {
    await donationService.deleteDonation(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Donation deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE DONATION ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * GET DONATION STATISTICS
 * =====================================================
 */

const getDonationStats = async (req, res) => {
  try {
    const stats =
      await donationService.getDonationStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(
      "GET DONATION STATS ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * INITIATE DONATION CHECKOUT
 * =====================================================
 */

const initiateDonationCheckout = async (
  req,
  res
) => {
  try {
    const callbackUrl =
      req.body.callbackUrl ||
      process.env.DONATION_CALLBACK_URL ||
      req.get("origin") ||
      process.env.CORS_ORIGIN ||
      `${req.protocol}://${req.get("host")}/donate`;

    const checkout =
      await donationService.initiateDonationCheckout(
        {
          ...req.body,
          callbackUrl,
        }
      );

    return res.status(201).json({
      success: true,
      message:
        "Donation checkout initialized successfully.",
      data: checkout,
    });
  } catch (error) {
    console.error(
      "INITIATE DONATION CHECKOUT ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * VERIFY DONATION PAYMENT
 * =====================================================
 */

const verifyDonationPayment = async (req, res) => {
  try {
    const donation =
      await donationService.verifyDonationPayment(
        req.params.reference
      );

    return res.status(200).json({
      success: true,
      message: "Donation payment verified.",
      data: donation,
    });
  } catch (error) {
    console.error(
      "VERIFY DONATION PAYMENT ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * PAYSTACK WEBHOOK
 * =====================================================
 */

const handlePaystackWebhook = async (req, res) => {
  try {
    const signature =
      req.get("x-paystack-signature");

    if (!req.rawBody) {
      return res.status(400).json({
        success: false,
        message:
          "Webhook raw body is required for signature verification.",
      });
    }

    const result =
      await donationService.handlePaystackWebhook({
        payload: req.body,
        rawBody: req.rawBody,
        signature,
      });

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully.",
      data: result,
    });
  } catch (error) {
    console.error(
      "PAYSTACK WEBHOOK ERROR:",
      error
    );

    return sendErrorResponse(res, error);
  }
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
  getDonationStats,
  initiateDonationCheckout,
  verifyDonationPayment,
  handlePaystackWebhook,
};