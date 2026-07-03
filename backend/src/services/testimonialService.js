/**
 * =====================================================
 * TESTIMONIAL SERVICE
 * =====================================================
 * Handles all Testimonial database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET ALL TESTIMONIALS
 * =====================================================
 */

const getAllTestimonials = async () => {
  try {
    return await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(
      "GET TESTIMONIALS ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * GET TESTIMONIAL BY ID
 * =====================================================
 */

const getTestimonialById = async (id) => {
  try {
    return await prisma.testimonial.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "GET TESTIMONIAL ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * CREATE TESTIMONIAL
 * =====================================================
 */

const createTestimonial = async (data) => {
  try {
    return await prisma.testimonial.create({
      data: {
        name: data.name,
        image: data.image || null,
        message: data.message,
      },
    });
  } catch (error) {
    console.error(
      "CREATE TESTIMONIAL ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE TESTIMONIAL
 * =====================================================
 */

const updateTestimonial = async (
  id,
  data
) => {
  try {
    return await prisma.testimonial.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        image: data.image,
        message: data.message,
      },
    });
  } catch (error) {
    console.error(
      "UPDATE TESTIMONIAL ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * DELETE TESTIMONIAL
 * =====================================================
 */

const deleteTestimonial = async (
  id
) => {
  try {
    return await prisma.testimonial.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "DELETE TESTIMONIAL ERROR:",
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
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};