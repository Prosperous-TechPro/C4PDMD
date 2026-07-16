/**
 * =====================================================
 * BLOG SERVICE
 * =====================================================
 * Handles all Blog database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET ALL BLOG POSTS
 * =====================================================
 */

const getAllBlogPosts = async () => {
  try {
    return await prisma.blogPost.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("GET BLOG POSTS ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * GET BLOG POST BY ID
 * =====================================================
 */

const getBlogPostById = async (id) => {
  try {
    return await prisma.blogPost.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("GET BLOG POST ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * CREATE BLOG POST
 * =====================================================
 */

const createBlogPost = async (data) => {
  try {
    const categoryName = data.categoryName || "General";
    const requestedCategoryId = data.categoryId ? Number(data.categoryId) : null;

    let categoryId = requestedCategoryId;

    if (!categoryId) {
      const existingCategory = await prisma.blogCategory.findFirst({
        where: { name: categoryName },
      });

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const createdCategory = await prisma.blogCategory.create({
          data: { name: categoryName },
        });
        categoryId = createdCategory.id;
      }
    }

    return await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        image: data.image || null,
        media: data.media || [],
        status: data.status || "DRAFT",
        categoryId,
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("CREATE BLOG POST ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE BLOG POST
 * =====================================================
 */

const updateBlogPost = async (id, data) => {
  try {
    return await prisma.blogPost.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        media: data.media || [],
        status: data.status,
        categoryId: Number(data.categoryId),
      },
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("UPDATE BLOG POST ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * DELETE BLOG POST
 * =====================================================
 */

const deleteBlogPost = async (id) => {
  try {
    return await prisma.blogPost.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error("DELETE BLOG POST ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * CREATE BLOG CATEGORY
 * =====================================================
 */

const createBlogCategory = async (data) => {
  try {
    return await prisma.blogCategory.create({
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    console.error("CREATE BLOG CATEGORY ERROR:", error);
    throw error;
  }
};

const updateBlogCategory = async (id, data) => {
  try {
    return await prisma.blogCategory.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    console.error("UPDATE BLOG CATEGORY ERROR:", error);
    throw error;
  }
};

const deleteBlogCategory = async (id) => {
  try {
    return await prisma.blogCategory.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error("DELETE BLOG CATEGORY ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * GET ALL BLOG CATEGORIES
 * =====================================================
 */

const getAllBlogCategories = async () => {
  try {
    return await prisma.blogCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("GET BLOG CATEGORIES ERROR:", error);
    throw error;
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