/**
 * =====================================================
 * BLOG CONTROLLER
 * =====================================================
 * Handles Blog HTTP requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const blogService = require("../services/blogService");

/**
 * GET ALL BLOG POSTS
 */

const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await blogService.getAllBlogPosts();

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("GET BLOG POSTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET BLOG POST
 */

const getBlogPostById = async (req, res) => {
  try {
    const post = await blogService.getBlogPostById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("GET BLOG POST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * CREATE BLOG POST
 */

const createBlogPost = async (req, res) => {
  try {
    const post = await blogService.createBlogPost(
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully.",
      data: post,
    });
  } catch (error) {
    console.error("CREATE BLOG POST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE BLOG POST
 */

const updateBlogPost = async (req, res) => {
  try {
    const post = await blogService.updateBlogPost(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Blog post updated successfully.",
      data: post,
    });
  } catch (error) {
    console.error("UPDATE BLOG POST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE BLOG POST
 */

const deleteBlogPost = async (req, res) => {
  try {
    await blogService.deleteBlogPost(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Blog post deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE BLOG POST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * CREATE BLOG CATEGORY
 */

const createBlogCategory = async (req, res) => {
  try {
    const category =
      await blogService.createBlogCategory(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Blog category created successfully.",
      data: category,
    });
  } catch (error) {
    console.error("CREATE BLOG CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE BLOG CATEGORY
 */

const updateBlogCategory = async (req, res) => {
  try {
    const category =
      await blogService.updateBlogCategory(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Blog category updated successfully.",
      data: category,
    });
  } catch (error) {
    console.error("UPDATE BLOG CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE BLOG CATEGORY
 */

const deleteBlogCategory = async (req, res) => {
  try {
    await blogService.deleteBlogCategory(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Blog category deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE BLOG CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL BLOG CATEGORIES
 */

const getAllBlogCategories = async (req, res) => {
  try {
    const categories =
      await blogService.getAllBlogCategories();

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("GET BLOG CATEGORIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getAllBlogCategories,
};