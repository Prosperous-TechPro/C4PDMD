/**
 * =====================================================
 * SERVICE SERVICE
 * =====================================================
 * Handles all Service database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET ALL SERVICES
 * =====================================================
 */
const getAllServices = async () => {
  try {
    return await prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Get All Services Error:", error);
    throw error;
  }
};

/**
 * =====================================================
 * GET SERVICE BY ID
 * =====================================================
 */
const getServiceById = async (id) => {
  try {
    return await prisma.service.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error("Get Service By ID Error:", error);
    throw error;
  }
};

/**
 * =====================================================
 * CREATE SERVICE
 * =====================================================
 */
const createService = async (data) => {
  try {
    return await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image || null,
        status: data.status || "ACTIVE",
      },
    });
  } catch (error) {
    console.error("Create Service Error:", error);
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE SERVICE
 * =====================================================
 */
const updateService = async (id, data) => {
  try {
    return await prisma.service.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        status: data.status,
      },
    });
  } catch (error) {
    console.error("Update Service Error:", error);
    throw error;
  }
};

/**
 * =====================================================
 * DELETE SERVICE
 * =====================================================
 */
const deleteService = async (id) => {
  try {
    return await prisma.service.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error("Delete Service Error:", error);
    throw error;
  }
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};