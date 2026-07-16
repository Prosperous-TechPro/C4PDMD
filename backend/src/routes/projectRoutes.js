/**
 * =====================================================
 * PROJECT ROUTES
 * =====================================================
 * Handles all Project API routes.
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
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  createProjectCategory,
  updateProjectCategory,
  getAllProjectCategories,
} = require("../controllers/projectController");

/**
 * =====================================================
 * PROJECT CATEGORY ROUTES
 * =====================================================
 */

/**
 * -----------------------------------------------------
 * GET ALL PROJECT CATEGORIES
 * Route:
 * GET /api/projects/categories
 * -----------------------------------------------------
 */
router.get(
  "/categories",
  getAllProjectCategories
);

/**
 * -----------------------------------------------------
 * CREATE PROJECT CATEGORY
 * Route:
 * POST /api/projects/categories
 * -----------------------------------------------------
 */
router.post(
  "/categories",
  createProjectCategory
);

router.put(
  "/categories/:id",
  updateProjectCategory
);

/**
 * =====================================================
 * PROJECT ROUTES
 * =====================================================
 */

/**
 * -----------------------------------------------------
 * GET ALL PROJECTS
 * Route:
 * GET /api/projects
 * -----------------------------------------------------
 */
router.get(
  "/",
  getAllProjects
);

/**
 * -----------------------------------------------------
 * GET PROJECT BY ID
 * Route:
 * GET /api/projects/:id
 * -----------------------------------------------------
 */
router.get(
  "/:id",
  getProjectById
);

/**
 * -----------------------------------------------------
 * CREATE PROJECT
 * Route:
 * POST /api/projects
 * -----------------------------------------------------
 */
router.post(
  "/",
  createProject
);

/**
 * -----------------------------------------------------
 * UPDATE PROJECT
 * Route:
 * PUT /api/projects/:id
 * -----------------------------------------------------
 */
router.put(
  "/:id",
  updateProject
);

/**
 * -----------------------------------------------------
 * DELETE PROJECT
 * Route:
 * DELETE /api/projects/:id
 * -----------------------------------------------------
 */
router.delete(
  "/:id",
  deleteProject
);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;