/**
 * =====================================================
 * USER API
 * =====================================================
 * Handles all User API Requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL USERS
 * =====================================================
 */
export const getUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};

/**
 * =====================================================
 * GET USER BY ID
 * =====================================================
 */
export const getUser = async (id) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};

/**
 * =====================================================
 * GET ALL ROLES
 * =====================================================
 */
export const getRoles = async () => {
  const response = await API.get("/users/roles");
  return response.data;
};

/**
 * =====================================================
 * CREATE USER
 * =====================================================
 */
export const createUser = async (data) => {
  const response = await API.post("/users", data);
  return response.data;
};

/**
 * =====================================================
 * UPDATE USER
 * =====================================================
 */
export const updateUser = async (id, data) => {
  const response = await API.put(`/users/${id}`, data);
  return response.data;
};

/**
 * =====================================================
 * DELETE USER
 * =====================================================
 */
export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};