/**
 * =====================================================
 * USER CONTROLLER
 * =====================================================
 * Handles all User HTTP Requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const userService = require("../services/userService");

/**
 * =====================================================
 * GET ALL USERS
 * =====================================================
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("GET USERS CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * GET USER BY ID
 * =====================================================
 */
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("GET USER CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * CREATE USER
 * =====================================================
 */
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    console.error("CREATE USER CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * UPDATE USER
 * =====================================================
 */
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: user,
    });
  } catch (error) {
    console.error("UPDATE USER CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * DELETE USER
 * =====================================================
 */
const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE USER CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =====================================================
 * GET ALL ROLES
 * =====================================================
 */
const getRoles = async (req, res) => {
  try {
    const roles = await userService.getRoles();

    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    console.error("GET ROLES CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Approve a user (Admin action)
 */
const approveUser = async (req, res) => {
  try {
    const approverId = req.user?.id;
    const user = await userService.approveUser(req.params.id, approverId);

    return res.status(200).json({ success: true, message: "User approved.", data: user });
  } catch (error) {
    console.error("APPROVE USER CONTROLLER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const changeRole = async (req, res) => {
  try {
    const { roleId } = req.body;
    if (!roleId) return res.status(400).json({ success: false, message: "roleId is required" });
    const user = await userService.changeUserRole(req.params.id, roleId);
    return res.status(200).json({ success: true, message: "Role updated.", data: user });
  } catch (error) {
    console.error("CHANGE ROLE CONTROLLER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: "status is required" });
    const user = await userService.changeUserStatus(req.params.id, status);
    return res.status(200).json({ success: true, message: "Status updated.", data: user });
  } catch (error) {
    console.error("CHANGE STATUS CONTROLLER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
  approveUser,
  changeRole,
  changeStatus,
};