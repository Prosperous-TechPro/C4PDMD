/**
 * =====================================================
 * DONATION ROUTES
 * =====================================================
 * Handles all Donation API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonation,
  deleteDonation,
  getDonationStats,
  getAllFundMovements,
  createFundMovement,
  getFundMovementById,
  updateFundMovement,
  printFundMovement,
  initiateDonationCheckout,
  verifyDonationPayment,
  handlePaystackWebhook,
} = require("../controllers/donationController");

/**
 * =====================================================
 * DONATION STATISTICS
 * =====================================================
 */

/**
 * GET DONATION STATISTICS
 * GET /api/donations/stats
 */
router.get(
  "/stats",
  getDonationStats
);

/**
 * POST /api/donations/checkout
 */
router.post(
  "/checkout",
  initiateDonationCheckout
);

router.get(
  "/fund-movements",
  authenticate,
  authorize("SUPER_ADMIN", "Admin"),
  getAllFundMovements
);

router.post(
  "/fund-movements",
  authenticate,
  authorize("SUPER_ADMIN", "Admin"),
  createFundMovement
);

router.get(
  "/fund-movements/:id",
  authenticate,
  authorize("SUPER_ADMIN", "Admin"),
  getFundMovementById
);

router.put(
  "/fund-movements/:id",
  authenticate,
  authorize("SUPER_ADMIN", "Admin"),
  updateFundMovement
);

router.get(
  "/fund-movements/:id/print",
  authenticate,
  authorize("SUPER_ADMIN", "Admin"),
  printFundMovement
);

/**
 * GET /api/donations/verify/:reference
 */
router.get(
  "/verify/:reference",
  verifyDonationPayment
);

/**
 * POST /api/donations/webhook/paystack
 */
router.post(
  "/webhook/paystack",
  handlePaystackWebhook
);

/**
 * =====================================================
 * DONATION ROUTES
 * =====================================================
 */

/**
 * GET ALL DONATIONS
 * GET /api/donations
 */
router.get(
  "/",
  getAllDonations
);

/**
 * GET DONATION BY ID
 * GET /api/donations/:id
 */
router.get(
  "/:id",
  getDonationById
);

/**
 * CREATE DONATION
 * POST /api/donations
 */
router.post(
  "/",
  createDonation
);

/**
 * UPDATE DONATION
 * PUT /api/donations/:id
 */
router.put(
  "/:id",
  updateDonation
);

/**
 * DELETE DONATION
 * DELETE /api/donations/:id
 */
router.delete(
  "/:id",
  deleteDonation
);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;