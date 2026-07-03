/**
 * =====================================================
 * CONTACT ROUTES
 * =====================================================
 * Handles all Contact Message API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/contactController");

/**
 * =====================================================
 * CONTACT ROUTES
 * =====================================================
 */

/**
 * GET ALL CONTACT MESSAGES
 * GET /api/contacts
 */
router.get(
  "/",
  getAllMessages
);

/**
 * GET CONTACT MESSAGE BY ID
 * GET /api/contacts/:id
 */
router.get(
  "/:id",
  getMessageById
);

/**
 * CREATE CONTACT MESSAGE
 * POST /api/contacts
 */
router.post(
  "/",
  createMessage
);

/**
 * UPDATE CONTACT MESSAGE
 * PUT /api/contacts/:id
 */
router.put(
  "/:id",
  updateMessage
);

/**
 * DELETE CONTACT MESSAGE
 * DELETE /api/contacts/:id
 */
router.delete(
  "/:id",
  deleteMessage
);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;