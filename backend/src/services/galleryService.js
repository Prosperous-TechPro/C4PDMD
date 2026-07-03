/**
 * =====================================================
 * GALLERY SERVICE
 * =====================================================
 * Handles all Gallery database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET ALL GALLERY ITEMS
 * =====================================================
 */

const getAllGalleryItems = async () => {
  try {
    return await prisma.gallery.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(
      "GET GALLERY ITEMS ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * GET GALLERY ITEM BY ID
 * =====================================================
 */

const getGalleryItemById = async (id) => {
  try {
    return await prisma.gallery.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error(
      "GET GALLERY ITEM ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * CREATE GALLERY ITEM
 * =====================================================
 */

const createGalleryItem = async (data) => {
  try {
    return await prisma.gallery.create({
      data: {
        title: data.title,
        image: data.image,
        categoryId: Number(
          data.categoryId
        ),
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error(
      "CREATE GALLERY ITEM ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE GALLERY ITEM
 * =====================================================
 */

const updateGalleryItem = async (
  id,
  data
) => {
  try {
    return await prisma.gallery.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        image: data.image,
        categoryId: Number(
          data.categoryId
        ),
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error(
      "UPDATE GALLERY ITEM ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * DELETE GALLERY ITEM
 * =====================================================
 */

const deleteGalleryItem = async (id) => {
  try {
    return await prisma.gallery.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "DELETE GALLERY ITEM ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * CREATE GALLERY CATEGORY
 * =====================================================
 */

const createGalleryCategory = async (
  data
) => {
  try {
    return await prisma.galleryCategory.create({
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    console.error(
      "CREATE GALLERY CATEGORY ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * GET ALL GALLERY CATEGORIES
 * =====================================================
 */

const getAllGalleryCategories = async () => {
  try {
    return await prisma.galleryCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error(
      "GET GALLERY CATEGORIES ERROR:",
      error
    );
    throw error;
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
  getAllGalleryCategories,
};