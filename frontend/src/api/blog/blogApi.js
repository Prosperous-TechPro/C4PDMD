/**
 * =====================================================
 * BLOG API
 * =====================================================
 * Handles all Blog API requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL BLOG POSTS
 * =====================================================
 */

export const getBlogs = async () => {
  const response = await API.get("/blog");
  return response.data;
};

/**
 * =====================================================
 * GET BLOG POST BY ID
 * =====================================================
 */

export const getBlogById = async (id) => {
  const response = await API.get(`/blog/${id}`);
  return response.data;
};

/**
 * =====================================================
 * GET ALL BLOG CATEGORIES
 * =====================================================
 */

export const getBlogCategories = async () => {
  const response = await API.get(
    "/blog/categories"
  );

  return response.data;
};

/**
 * =====================================================
 * CREATE BLOG POST
 * =====================================================
 */

export const createBlog = async (data) => {
  const response = await API.post(
    "/blog",
    data
  );

  return response.data;
};

/**
 * =====================================================
 * UPDATE BLOG POST
 * =====================================================
 */

export const updateBlog = async (
  id,
  data
) => {
  const response = await API.put(
    `/blog/${id}`,
    data
  );

  return response.data;
};

/**
 * =====================================================
 * DELETE BLOG POST
 * =====================================================
 */

export const deleteBlog = async (id) => {
  const response = await API.delete(
    `/blog/${id}`
  );

  return response.data;
};

/**
 * =====================================================
 * CREATE BLOG CATEGORY
 * =====================================================
 */

export const createBlogCategory = async (
  data
) => {
  const response = await API.post(
    "/blog/categories",
    data
  );

  return response.data;
};