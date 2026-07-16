/**
 * =====================================================
 * GALLERY ROUTES
 * =====================================================
 * Handles all Gallery API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  createGalleryCategory,
  updateGalleryCategory,
  getAllGalleryCategories,
} = require("../controllers/galleryController");

/**
 * =====================================================
 * GALLERY CATEGORY ROUTES
 * =====================================================
 */

/**
 * GET ALL CATEGORIES
 * GET /api/gallery/categories
 */
router.get(
  "/categories",
  getAllGalleryCategories
);

/**
 * CREATE CATEGORY
 * POST /api/gallery/categories
 */
router.post(
  "/categories",
  createGalleryCategory
);

/**
 * UPDATE CATEGORY
 * PUT /api/gallery/categories/:id
 */
router.put(
  "/categories/:id",
  updateGalleryCategory
);

/**
 * =====================================================
 * GALLERY ITEM ROUTES
 * =====================================================
 */

/**
 * GET ALL GALLERY ITEMS
 * GET /api/gallery
 */
router.get(
  "/",
  getAllGalleryItems
);

/**
 * GET GALLERY ITEM BY ID
 * GET /api/gallery/:id
 */
router.get(
  "/:id",
  getGalleryItemById
);

/**
 * CREATE GALLERY ITEM
 * POST /api/gallery
 */
router.post(
  "/",
  createGalleryItem
);

/**
 * UPDATE GALLERY ITEM
 * PUT /api/gallery/:id
 */
router.put(
  "/:id",
  updateGalleryItem
);

/**
 * DELETE GALLERY ITEM
 * DELETE /api/gallery/:id
 */
router.delete(
  "/:id",
  deleteGalleryItem
);

/**
 * =====================================================
 * EXPORT ROUTER
 * =====================================================
 */

module.exports = router;