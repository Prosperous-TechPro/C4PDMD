/**
 * =====================================================
 * BLOG ROUTES
 * =====================================================
 * Handles all Blog API routes.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getAllBlogCategories,
} = require("../controllers/blogController");

/**
 * =====================================================
 * BLOG CATEGORY ROUTES
 * =====================================================
 */

router.get(
  "/categories",
  getAllBlogCategories
);

router.post(
  "/categories",
  createBlogCategory
);

router.put(
  "/categories/:id",
  updateBlogCategory
);

router.delete(
  "/categories/:id",
  deleteBlogCategory
);

/**
 * =====================================================
 * BLOG POST ROUTES
 * =====================================================
 */

router.get(
  "/",
  getAllBlogPosts
);

router.get(
  "/:id",
  getBlogPostById
);

router.post(
  "/",
  createBlogPost
);

router.put(
  "/:id",
  updateBlogPost
);

router.delete(
  "/:id",
  deleteBlogPost
);

module.exports = router;