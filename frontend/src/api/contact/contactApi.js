/**
 * =====================================================
 * CONTACT API
 * =====================================================
 * Handles all Contact Message API requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL CONTACT MESSAGES
 * =====================================================
 */

export const getMessages = async () => {
  const response = await API.get(
    "/contact"
  );

  return response.data;
};

/**
 * =====================================================
 * GET CONTACT MESSAGE BY ID
 * =====================================================
 */

export const getMessageById = async (
  id
) => {
  const response = await API.get(
    `/contact/${id}`
  );

  return response.data;
};

/**
 * =====================================================
 * CREATE CONTACT MESSAGE
 * =====================================================
 */

export const createMessage = async (
  data
) => {
  const response = await API.post(
    "/contact",
    data
  );

  return response.data;
};

/**
 * =====================================================
 * UPDATE CONTACT MESSAGE
 * =====================================================
 */

export const updateMessage = async (
  id,
  data
) => {
  const response = await API.put(
    `/contact/${id}`,
    data
  );

  return response.data;
};

/**
 * =====================================================
 * DELETE CONTACT MESSAGE
 * =====================================================
 */

export const deleteMessage = async (
  id
) => {
  const response = await API.delete(
    `/contact/${id}`
  );

  return response.data;
};