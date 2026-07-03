/**
 * =====================================================
 * TEAM CONTROLLER
 * =====================================================
 * Handles HTTP Requests and Responses
 * =====================================================
 */

const teamService = require("../services/teamService");

/**
 * GET /api/team
 */
const getAllTeamMembers = async (req, res) => {
  try {
    const members = await teamService.getAllTeamMembers();

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET /api/team/:id
 */
const getTeamMemberById = async (req, res) => {
  try {
    const member = await teamService.getTeamMemberById(
      req.params.id
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * POST /api/team
 */
const createTeamMember = async (req, res) => {
  try {
    const member = await teamService.createTeamMember(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Team member created successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * PUT /api/team/:id
 */
const updateTeamMember = async (req, res) => {
  try {
    const member = await teamService.updateTeamMember(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE /api/team/:id
 */
const deleteTeamMember = async (req, res) => {
  try {
    await teamService.deleteTeamMember(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};