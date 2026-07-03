/**
 * =====================================================
 * VOLUNTEER API
 * =====================================================
 * Handles all Volunteer API requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ALL VOLUNTEERS
 * =====================================================
 */

export const getVolunteers = async () => {
  const response = await API.get(
    "/volunteers"
  );

  return response.data;
};

/**
 * =====================================================
 * GET VOLUNTEER BY ID
 * =====================================================
 */

export const getVolunteerById =
  async (id) => {
    const response =
      await API.get(
        `/volunteers/${id}`
      );

    return response.data;
  };

/**
 * =====================================================
 * CREATE VOLUNTEER
 * =====================================================
 */

export const createVolunteer =
  async (data) => {
    const response =
      await API.post(
        "/volunteers",
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * UPDATE VOLUNTEER
 * =====================================================
 */

export const updateVolunteer =
  async (id, data) => {
    const response =
      await API.put(
        `/volunteers/${id}`,
        data
      );

    return response.data;
  };

/**
 * =====================================================
 * DELETE VOLUNTEER
 * =====================================================
 */

export const deleteVolunteer =
  async (id) => {
    const response =
      await API.delete(
        `/volunteers/${id}`
      );

    return response.data;
  };