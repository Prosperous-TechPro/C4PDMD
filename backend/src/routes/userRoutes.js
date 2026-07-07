/**
 * =====================================================
 * USER ROUTES
 * =====================================================
 * Handles all User API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

/**
 * =====================================================
 * IMPORT CONTROLLER
 * =====================================================
 */

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
  approveUser,
  changeRole,
  changeStatus,
} = require("../controllers/userController");

const authorize = require("../middleware/roleMiddleware");
const authenticate = require("../middleware/authMiddleware");

/**
 * =====================================================
 * USER ROUTES
 * =====================================================
 */

/**
 * -----------------------------------------------------
 * GET ALL USERS
 * Route:
 * GET /api/users
 * -----------------------------------------------------
 */
router.get("/", getAllUsers);

/**
 * -----------------------------------------------------
 * GET USER ROLES
 * Route:
 * GET /api/users/roles
 * -----------------------------------------------------
 *
 * IMPORTANT:
 * This route MUST come before "/:id"
 */
router.get("/roles", getRoles);

/**
 * -----------------------------------------------------
 * GET USER BY ID
 * Route:
 * GET /api/users/:id
 * -----------------------------------------------------
 */
router.get("/:id", getUserById);

/**
 * -----------------------------------------------------
 * CREATE USER
 * Route:
 * POST /api/users
 * -----------------------------------------------------
 */
router.post("/", authenticate, authorize("SUPER_ADMIN", "Admin"), createUser);

/**
 * -----------------------------------------------------
 * UPDATE USER
 * Route:
 * PUT /api/users/:id
 * -----------------------------------------------------
 */
router.put("/:id", authenticate, authorize("SUPER_ADMIN", "Admin"), updateUser);

/**
 * -----------------------------------------------------
 * DELETE USER
 * Route:
 * DELETE /api/users/:id
 * -----------------------------------------------------
 */
router.delete("/:id", authenticate, authorize("SUPER_ADMIN", "Admin"), deleteUser);

/**
 * Approve a pending user (SUPER_ADMIN only)
 */
router.patch("/:id/approve", authenticate, authorize("SUPER_ADMIN"), approveUser);

/**
 * Change user role (SUPER_ADMIN only)
 */
router.patch("/:id/role", authenticate, authorize("SUPER_ADMIN"), changeRole);

/**
 * Change user status (SUPER_ADMIN or Admin)
 */
router.patch("/:id/status", authenticate, authorize("SUPER_ADMIN", "Admin"), changeStatus);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;