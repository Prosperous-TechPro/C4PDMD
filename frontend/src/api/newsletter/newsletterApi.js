/**
 * =====================================================
 * NEWSLETTER API
 * =====================================================
 * Handles newsletter subscription requests.
 *
 * Author : ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

export const subscribeNewsletter = async (data) => {
  const response = await API.post("/newsletter", data);
  return response.data;
};
