/**
 * =====================================================
 * CONTACT CONTROLLER
 * =====================================================
 * Handles all Contact Message HTTP requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const contactService = require("../services/contactService");

/**
 * =====================================================
 * GET ALL MESSAGES
 * =====================================================
 */

const getAllMessages = async (req, res) => {
  try {
    const messages =
      await contactService.getAllMessages();

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error(
      "GET CONTACT MESSAGES ERROR:",
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
 * GET MESSAGE BY ID
 * =====================================================
 */

const getMessageById = async (req, res) => {
  try {
    const message =
      await contactService.getMessageById(
        req.params.id
      );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error(
      "GET CONTACT MESSAGE ERROR:",
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
 * CREATE MESSAGE
 * =====================================================
 */

const createMessage = async (req, res) => {
  try {
    const message =
      await contactService.createMessage(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Message sent successfully.",
      data: message,
    });
  } catch (error) {
    console.error(
      "CREATE CONTACT MESSAGE ERROR:",
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
 * UPDATE MESSAGE
 * =====================================================
 */

const updateMessage = async (req, res) => {
  try {
    const message =
      await contactService.updateMessage(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Message updated successfully.",
      data: message,
    });
  } catch (error) {
    console.error(
      "UPDATE CONTACT MESSAGE ERROR:",
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
 * DELETE MESSAGE
 * =====================================================
 */

const deleteMessage = async (req, res) => {
  try {
    await contactService.deleteMessage(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Message deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE CONTACT MESSAGE ERROR:",
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
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};