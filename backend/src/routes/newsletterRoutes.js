/**
 * =====================================================
 * NEWSLETTER ROUTES
 * =====================================================
 * Handles newsletter subscription API routes.
 *
 * Author : ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const { createSubscriber } = require("../controllers/newsletterController");

/**
 * =====================================================
 * NEWSLETTER SUBSCRIPTION
 * POST /api/newsletter
 */
router.post("/", createSubscriber);

module.exports = router;
