/**
 * =====================================================
 * TESTIMONIAL API
 * =====================================================
 * Handles all Testimonial API requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL TESTIMONIALS
 * =====================================================
 */

export const getTestimonials =
  async () => {
    const response =
      await API.get(
        "/testimonials"
      );

    return response.data;
  };

/**
 * =====================================================
 * GET TESTIMONIAL BY ID
 * =====================================================
 */

export const getTestimonialById =
  async (id) => {
    const response =
      await API.get(
        `/testimonials/${id}`
      );

    return response.data;
  };

/**
 * =====================================================
 * CREATE TESTIMONIAL
 * =====================================================
 */

export const createTestimonial =
  async (data) => {
    const response =
      await API.post(
        "/testimonials",
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * UPDATE TESTIMONIAL
 * =====================================================
 */

export const updateTestimonial =
  async (id, data) => {
    const response =
      await API.put(
        `/testimonials/${id}`,
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * DELETE TESTIMONIAL
 * =====================================================
 */

export const deleteTestimonial =
  async (id) => {
    const response =
      await API.delete(
        `/testimonials/${id}`
      );

    return response.data;
  };