/**
 * =====================================================
 * VOLUNTEER ROUTES
 * =====================================================
 * Handles all Volunteer API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
} = require("../controllers/volunteerController");

/**
 * =====================================================
 * VOLUNTEER ROUTES
 * =====================================================
 */

/**
 * GET ALL VOLUNTEERS
 * GET /api/volunteers
 */
router.get(
  "/",
  getAllVolunteers
);

/**
 * GET VOLUNTEER BY ID
 * GET /api/volunteers/:id
 */
router.get(
  "/:id",
  getVolunteerById
);

/**
 * CREATE VOLUNTEER
 * POST /api/volunteers
 */
router.post(
  "/",
  createVolunteer
);

/**
 * UPDATE VOLUNTEER
 * PUT /api/volunteers/:id
 */
router.put(
  "/:id",
  updateVolunteer
);

/**
 * DELETE VOLUNTEER
 * DELETE /api/volunteers/:id
 */
router.delete(
  "/:id",
  deleteVolunteer
);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;