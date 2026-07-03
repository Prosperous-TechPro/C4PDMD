/**
 * =====================================================
 * GALLERY API
 * =====================================================
 * Handles all Gallery API requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL GALLERY ITEMS
 * =====================================================
 */

export const getGalleryItems = async () => {
  const response = await API.get(
    "/gallery"
  );

  return response.data;
};

/**
 * =====================================================
 * GET GALLERY ITEM BY ID
 * =====================================================
 */

export const getGalleryItemById = async (
  id
) => {
  const response = await API.get(
    `/gallery/${id}`
  );

  return response.data;
};

/**
 * =====================================================
 * GET ALL GALLERY CATEGORIES
 * =====================================================
 */

export const getGalleryCategories =
  async () => {
    const response = await API.get(
      "/gallery/categories"
    );

    return response.data;
  };

/**
 * =====================================================
 * CREATE GALLERY ITEM
 * =====================================================
 */

export const createGalleryItem =
  async (data) => {
    const response = await API.post(
      "/gallery",
      data
    );

    return response.data;
  };

/**
 * =====================================================
 * UPDATE GALLERY ITEM
 * =====================================================
 */

export const updateGalleryItem =
  async (id, data) => {
    const response = await API.put(
      `/gallery/${id}`,
      data
    );

    return response.data;
  };

/**
 * =====================================================
 * DELETE GALLERY ITEM
 * =====================================================
 */

export const deleteGalleryItem =
  async (id) => {
    const response = await API.delete(
      `/gallery/${id}`
    );

    return response.data;
  };

/**
 * =====================================================
 * CREATE GALLERY CATEGORY
 * =====================================================
 */

export const createGalleryCategory =
  async (data) => {
    const response = await API.post(
      "/gallery/categories",
      data
    );

    return response.data;
  };