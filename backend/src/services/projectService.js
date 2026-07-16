/**
 * =====================================================
 * PROJECT SERVICE
 * =====================================================
 * Handles all Project database operations.
 *
 * Author : ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

const getAllProjects = async () => {
  try {
    return await prisma.project.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("GET ALL PROJECTS ERROR:", error);
    throw error;
  }
};

const getProjectById = async (id) => {
  try {
    return await prisma.project.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });
  } catch (error) {
    console.error("GET PROJECT BY ID ERROR:", error);
    throw error;
  }
};

const createProject = async (data) => {
  try {
    const categoryName = data.categoryName || "General";
    const requestedCategoryId = data.categoryId ? Number(data.categoryId) : null;

    let categoryId = requestedCategoryId;

    if (!categoryId) {
      const existingCategory = await prisma.projectCategory.findFirst({
        where: { name: categoryName },
      });

      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const createdCategory = await prisma.projectCategory.create({
          data: { name: categoryName },
        });
        categoryId = createdCategory.id;
      }
    }

    return await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image || null,
        status: data.status || "ACTIVE",
        categoryId,
      },
      include: { category: true },
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    throw error;
  }
};

const updateProject = async (id, data) => {
  try {
    return await prisma.project.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        status: data.status,
        categoryId: data.categoryId ? Number(data.categoryId) : undefined,
      },
      include: { category: true },
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
    throw error;
  }
};

const deleteProject = async (id) => {
  try {
    return await prisma.project.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    throw error;
  }
};

const createProjectCategory = async (data) => {
  try {
    return await prisma.projectCategory.create({
      data: { name: data.name },
    });
  } catch (error) {
    console.error("CREATE PROJECT CATEGORY ERROR:", error);
    throw error;
  }
};

const updateProjectCategory = async (id, data) => {
  try {
    return await prisma.projectCategory.update({
      where: { id: Number(id) },
      data: { name: data.name },
    });
  } catch (error) {
    console.error("UPDATE PROJECT CATEGORY ERROR:", error);
    throw error;
  }
};

const getAllProjectCategories = async () => {
  try {
    return await prisma.projectCategory.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("GET PROJECT CATEGORIES ERROR:", error);
    throw error;
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  createProjectCategory,
  updateProjectCategory,
  getAllProjectCategories,
};