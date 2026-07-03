/**
 * =====================================================
 * VOLUNTEER CONTROLLER
 * =====================================================
 * Handles all Volunteer HTTP requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const volunteerService = require("../services/volunteerService");

/**
 * =====================================================
 * GET ALL VOLUNTEERS
 * =====================================================
 */

const getAllVolunteers = async (req, res) => {
  try {
    const volunteers =
      await volunteerService.getAllVolunteers();

    return res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers,
    });
  } catch (error) {
    console.error(
      "GET VOLUNTEERS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * GET VOLUNTEER BY ID
 * =====================================================
 */

const getVolunteerById = async (req, res) => {
  try {
    const volunteer =
      await volunteerService.getVolunteerById(
        req.params.id
      );

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: volunteer,
    });
  } catch (error) {
    console.error(
      "GET VOLUNTEER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * CREATE VOLUNTEER
 * =====================================================
 */

const createVolunteer = async (req, res) => {
  try {
    const volunteer =
      await volunteerService.createVolunteer(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Volunteer application submitted successfully.",
      data: volunteer,
    });
  } catch (error) {
    console.error(
      "CREATE VOLUNTEER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * UPDATE VOLUNTEER
 * =====================================================
 */

const updateVolunteer = async (req, res) => {
  try {
    const volunteer =
      await volunteerService.updateVolunteer(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Volunteer updated successfully.",
      data: volunteer,
    });
  } catch (error) {
    console.error(
      "UPDATE VOLUNTEER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * DELETE VOLUNTEER
 * =====================================================
 */

const deleteVolunteer = async (req, res) => {
  try {
    await volunteerService.deleteVolunteer(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Volunteer deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE VOLUNTEER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
};