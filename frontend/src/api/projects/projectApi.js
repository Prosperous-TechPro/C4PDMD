/**
 * =====================================================
 * PROJECT API
 * =====================================================
 * Handles all Project API Requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL PROJECTS
 * =====================================================
 */
export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

/**
 * =====================================================
 * GET PROJECT BY ID
 * =====================================================
 */
export const getProject = async (id) => {
  const response = await API.get(`/projects/${id}`);
  return response.data;
};

/**
 * =====================================================
 * GET ALL PROJECT CATEGORIES
 * =====================================================
 */
export const getProjectCategories = async () => {
  const response = await API.get("/projects/categories");
  return response.data;
};

/**
 * =====================================================
 * CREATE PROJECT
 * =====================================================
 */
export const createProject = async (data) => {
  const response = await API.post("/projects", data);
  return response.data;
};

/**
 * =====================================================
 * UPDATE PROJECT
 * =====================================================
 */
export const updateProject = async (id, data) => {
  const response = await API.put(
    `/projects/${id}`,
    data
  );

  return response.data;
};

/**
 * =====================================================
 * DELETE PROJECT
 * =====================================================
 */
export const deleteProject = async (id) => {
  const response = await API.delete(
    `/projects/${id}`
  );

  return response.data;
};

/**
 * =====================================================
 * CREATE PROJECT CATEGORY
 * =====================================================
 */
export const createProjectCategory = async (
  data
) => {
  const response = await API.post(
    "/projects/categories",
    data
  );

  return response.data;
};

// Backwards-compatible alias expected by some imports
export const getProjectById = getProject;