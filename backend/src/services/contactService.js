/**
 * =====================================================
 * CONTACT SERVICE
 * =====================================================
 * Handles all Contact Message database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET ALL MESSAGES
 * =====================================================
 */

const getAllMessages = async () => {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(
      "GET CONTACT MESSAGES ERROR:",
      error
    );

    throw error;
  }
};

/**
 * =====================================================
 * GET MESSAGE BY ID
 * =====================================================
 */

const getMessageById = async (id) => {
  try {
    return await prisma.contactMessage.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "GET CONTACT MESSAGE ERROR:",
      error
    );

    throw error;
  }
};

/**
 * =====================================================
 * CREATE MESSAGE
 * =====================================================
 */

const createMessage = async (data) => {
  try {
    return await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: "NEW",
      },
    });
  } catch (error) {
    console.error(
      "CREATE CONTACT MESSAGE ERROR:",
      error
    );

    throw error;
  }
};

/**
 * =====================================================
 * UPDATE MESSAGE
 * =====================================================
 */

const updateMessage = async (
  id,
  data
) => {
  try {
    return await prisma.contactMessage.update({
      where: {
        id: Number(id),
      },
      data: {
        status: data.status,
      },
    });
  } catch (error) {
    console.error(
      "UPDATE CONTACT MESSAGE ERROR:",
      error
    );

    throw error;
  }
};

/**
 * =====================================================
 * DELETE MESSAGE
 * =====================================================
 */

const deleteMessage = async (
  id
) => {
  try {
    return await prisma.contactMessage.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "DELETE CONTACT MESSAGE ERROR:",
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
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};