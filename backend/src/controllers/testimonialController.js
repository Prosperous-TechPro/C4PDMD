/**
 * =====================================================
 * TESTIMONIAL CONTROLLER
 * =====================================================
 * Handles all Testimonial HTTP requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const testimonialService = require("../services/testimonialService");

/**
 * =====================================================
 * GET ALL TESTIMONIALS
 * =====================================================
 */

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials =
      await testimonialService.getAllTestimonials();

    return res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error(
      "GET TESTIMONIALS ERROR:",
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
 * GET TESTIMONIAL BY ID
 * =====================================================
 */

const getTestimonialById = async (req, res) => {
  try {
    const testimonial =
      await testimonialService.getTestimonialById(
        req.params.id
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    console.error(
      "GET TESTIMONIAL ERROR:",
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
 * CREATE TESTIMONIAL
 * =====================================================
 */

const createTestimonial = async (req, res) => {
  try {
    const testimonial =
      await testimonialService.createTestimonial(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Testimonial created successfully.",
      data: testimonial,
    });
  } catch (error) {
    console.error(
      "CREATE TESTIMONIAL ERROR:",
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
 * UPDATE TESTIMONIAL
 * =====================================================
 */

const updateTestimonial = async (req, res) => {
  try {
    const testimonial =
      await testimonialService.updateTestimonial(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Testimonial updated successfully.",
      data: testimonial,
    });
  } catch (error) {
    console.error(
      "UPDATE TESTIMONIAL ERROR:",
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
 * DELETE TESTIMONIAL
 * =====================================================
 */

const deleteTestimonial = async (req, res) => {
  try {
    await testimonialService.deleteTestimonial(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE TESTIMONIAL ERROR:",
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
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};