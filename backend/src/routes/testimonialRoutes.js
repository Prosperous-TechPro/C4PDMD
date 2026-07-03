/**
 * =====================================================
 * TESTIMONIAL ROUTES
 * =====================================================
 * Handles all Testimonial API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

/**
 * =====================================================
 * TESTIMONIAL ROUTES
 * =====================================================
 */

/**
 * GET ALL TESTIMONIALS
 * GET /api/testimonials
 */
router.get(
  "/",
  getAllTestimonials
);

/**
 * GET TESTIMONIAL BY ID
 * GET /api/testimonials/:id
 */
router.get(
  "/:id",
  getTestimonialById
);

/**
 * CREATE TESTIMONIAL
 * POST /api/testimonials
 */
router.post(
  "/",
  createTestimonial
);

/**
 * UPDATE TESTIMONIAL
 * PUT /api/testimonials/:id
 */
router.put(
  "/:id",
  updateTestimonial
);

/**
 * DELETE TESTIMONIAL
 * DELETE /api/testimonials/:id
 */
router.delete(
  "/:id",
  deleteTestimonial
);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;