/**
 * =====================================================
 * GALLERY CONTROLLER
 * =====================================================
 * Handles all Gallery HTTP requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const galleryService = require("../services/galleryService");

/**
 * =====================================================
 * GET ALL GALLERY ITEMS
 * =====================================================
 */

const getAllGalleryItems = async (req, res) => {
  try {
    const items =
      await galleryService.getAllGalleryItems();

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error(
      "GET GALLERY ITEMS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * GET GALLERY ITEM BY ID
 * =====================================================
 */

const getGalleryItemById = async (req, res) => {
  try {
    const item =
      await galleryService.getGalleryItemById(
        req.params.id
      );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error(
      "GET GALLERY ITEM ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * CREATE GALLERY ITEM
 * =====================================================
 */

const createGalleryItem = async (req, res) => {
  try {
    const item =
      await galleryService.createGalleryItem(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Gallery item created successfully.",
      data: item,
    });
  } catch (error) {
    console.error(
      "CREATE GALLERY ITEM ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * UPDATE GALLERY ITEM
 * =====================================================
 */

const updateGalleryItem = async (req, res) => {
  try {
    const item =
      await galleryService.updateGalleryItem(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Gallery item updated successfully.",
      data: item,
    });
  } catch (error) {
    console.error(
      "UPDATE GALLERY ITEM ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * DELETE GALLERY ITEM
 * =====================================================
 */

const deleteGalleryItem = async (req, res) => {
  try {
    await galleryService.deleteGalleryItem(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE GALLERY ITEM ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * CREATE GALLERY CATEGORY
 * =====================================================
 */

const createGalleryCategory = async (
  req,
  res
) => {
  try {
    const category =
      await galleryService.createGalleryCategory(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Gallery category created successfully.",
      data: category,
    });
  } catch (error) {
    console.error(
      "CREATE GALLERY CATEGORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * GET ALL GALLERY CATEGORIES
 * =====================================================
 */

const updateGalleryCategory = async (
  req,
  res
) => {
  try {
    const category =
      await galleryService.updateGalleryCategory(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Gallery category updated successfully.",
      data: category,
    });
  } catch (error) {
    console.error(
      "UPDATE GALLERY CATEGORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllGalleryCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await galleryService.getAllGalleryCategories();

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error(
      "GET GALLERY CATEGORIES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  createGalleryCategory,
  updateGalleryCategory,
  getAllGalleryCategories,
};