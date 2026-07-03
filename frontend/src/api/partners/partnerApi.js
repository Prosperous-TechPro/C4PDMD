/**
 * =====================================================
 * PARTNER API
 * =====================================================
 * Handles all Partner API requests.
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL PARTNERS
 * =====================================================
 */

export const getPartners = async () => {
  const response = await API.get(
    "/partners"
  );

  return response.data;
};

/**
 * =====================================================
 * GET PARTNER BY ID
 * =====================================================
 */

export const getPartnerById =
  async (id) => {
    const response =
      await API.get(
        `/partners/${id}`
      );

    return response.data;
  };

/**
 * =====================================================
 * CREATE PARTNER
 * =====================================================
 */

export const createPartner =
  async (data) => {
    const response =
      await API.post(
        "/partners",
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * UPDATE PARTNER
 * =====================================================
 */

export const updatePartner =
  async (id, data) => {
    const response =
      await API.put(
        `/partners/${id}`,
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * DELETE PARTNER
 * =====================================================
 */

export const deletePartner =
  async (id) => {
    const response =
      await API.delete(
        `/partners/${id}`
      );

    return response.data;
  };