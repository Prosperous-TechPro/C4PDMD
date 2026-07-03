/**
 * =====================================================
 * SERVICE API
 * =====================================================
 * Handles all Service API Requests
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL SERVICES
 * =====================================================
 */
export const getServices = async () => {
  const response = await API.get("/services");
  return response.data;
};

/**
 * =====================================================
 * GET SERVICE BY ID
 * =====================================================
 */
export const getService = async (id) => {
  const response = await API.get(`/services/${id}`);
  return response.data;
};

/**
 * =====================================================
 * CREATE SERVICE
 * =====================================================
 */
export const createService = async (data) => {
  const response = await API.post("/services", data);
  return response.data;
};

/**
 * =====================================================
 * UPDATE SERVICE
 * =====================================================
 */
export const updateService = async (id, data) => {
  const response = await API.put(`/services/${id}`, data);
  return response.data;
};

/**
 * =====================================================
 * DELETE SERVICE
 * =====================================================
 */
export const deleteService = async (id) => {
  const response = await API.delete(`/services/${id}`);
  return response.data;
};