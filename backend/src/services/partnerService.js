/**
 * =====================================================
 * PARTNER SERVICE
 * =====================================================
 * Handles all Partner database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET ALL PARTNERS
 * =====================================================
 */

const getAllPartners = async () => {
  try {
    return await prisma.partner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(
      "GET PARTNERS ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * GET PARTNER BY ID
 * =====================================================
 */

const getPartnerById = async (id) => {
  try {
    return await prisma.partner.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "GET PARTNER ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * CREATE PARTNER
 * =====================================================
 */

const createPartner = async (data) => {
  try {
    return await prisma.partner.create({
      data: {
        name: data.name,
        logo: data.logo || null,
        description: data.description || null,
        website: data.website || null,
        linkedin: data.linkedin || null,
        facebook: data.facebook || null,
        twitter: data.twitter || null,
        whatsapp: data.whatsapp || null,
      },
    });
  } catch (error) {
    console.error(
      "CREATE PARTNER ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE PARTNER
 * =====================================================
 */

const updatePartner = async (
  id,
  data
) => {
  try {
    return await prisma.partner.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        logo: data.logo,
        description: data.description || null,
        website: data.website,
        linkedin: data.linkedin || null,
        facebook: data.facebook || null,
        twitter: data.twitter || null,
        whatsapp: data.whatsapp || null,
      },
    });
  } catch (error) {
    console.error(
      "UPDATE PARTNER ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * DELETE PARTNER
 * =====================================================
 */

const deletePartner = async (
  id
) => {
  try {
    return await prisma.partner.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "DELETE PARTNER ERROR:",
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
  getAllPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
};