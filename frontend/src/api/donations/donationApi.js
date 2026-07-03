/**
 * =====================================================
 * DONATION API
 * =====================================================
 * Handles all Donation API requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL DONATIONS
 * =====================================================
 */

export const getDonations = async () => {
  const response = await API.get(
    "/donations"
  );

  return response.data;
};

/**
 * =====================================================
 * GET DONATION BY ID
 * =====================================================
 */

export const getDonationById =
  async (id) => {
    const response =
      await API.get(
        `/donations/${id}`
      );

    return response.data;
  };

/**
 * =====================================================
 * CREATE DONATION
 * =====================================================
 */

export const createDonation =
  async (data) => {
    const response =
      await API.post(
        "/donations",
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * INITIATE DONATION CHECKOUT
 * =====================================================
 */

export const initiateDonationCheckout =
  async (data) => {
    const response =
      await API.post(
        "/donations/checkout",
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * VERIFY DONATION PAYMENT
 * =====================================================
 */

export const verifyDonationPayment =
  async (reference) => {
    const response =
      await API.get(
        `/donations/verify/${reference}`
      );

    return response.data;
  };

/**
 * =====================================================
 * UPDATE DONATION
 * =====================================================
 */

export const updateDonation =
  async (id, data) => {
    const response =
      await API.put(
        `/donations/${id}`,
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * DELETE DONATION
 * =====================================================
 */

export const deleteDonation =
  async (id) => {
    const response =
      await API.delete(
        `/donations/${id}`
      );

    return response.data;
  };

/**
 * =====================================================
 * GET DONATION STATISTICS
 * =====================================================
 */

export const getDonationStats =
  async () => {
    const response =
      await API.get(
        "/donations/stats"
      );

    return response.data;
  };