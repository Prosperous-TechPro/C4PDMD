/**
 * =====================================================
 * NEWSLETTER SERVICE
 * =====================================================
 * Handles newsletter subscriber database operations.
 *
 * Author : ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

const createSubscriber = async (data) => {
  try {
    return await prisma.newsletterSubscriber.create({
      data: {
        email: data.email.toLowerCase().trim(),
        status: data.status || "SUBSCRIBED",
      },
    });
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      const duplicateError = new Error("This email is already subscribed.");
      duplicateError.status = 409;
      throw duplicateError;
    }

    console.error("CREATE NEWSLETTER SUBSCRIBER ERROR:", error);
    throw error;
  }
};

module.exports = {
  createSubscriber,
};
