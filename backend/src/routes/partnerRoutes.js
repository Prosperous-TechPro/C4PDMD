/**
 * =====================================================
 * PARTNER ROUTES
 * =====================================================
 * Handles all Partner API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
} = require("../controllers/partnerController");

/**
 * =====================================================
 * PARTNER ROUTES
 * =====================================================
 */

/**
 * GET ALL PARTNERS
 * GET /api/partners
 */
router.get(
  "/",
  getAllPartners
);

/**
 * GET PARTNER BY ID
 * GET /api/partners/:id
 */
router.get(
  "/:id",
  getPartnerById
);

/**
 * CREATE PARTNER
 * POST /api/partners
 */
router.post(
  "/",
  createPartner
);

/**
 * UPDATE PARTNER
 * PUT /api/partners/:id
 */
router.put(
  "/:id",
  updatePartner
);

/**
 * DELETE PARTNER
 * DELETE /api/partners/:id
 */
router.delete(
  "/:id",
  deletePartner
);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;