/**
 * =====================================================
 * NEWSLETTER CONTROLLER
 * =====================================================
 * Handles newsletter subscriber HTTP requests.
 *
 * Author : ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const newsletterService = require("../services/newsletterService");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.toString().trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const trimmedEmail = email.toString().trim().toLowerCase();

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!trimmedEmail.endsWith("@gmail.com")) {
      return res.status(400).json({
        success: false,
        message: "Please subscribe using a Gmail address.",
      });
    }

    const subscriber = await newsletterService.createSubscriber({
      email: trimmedEmail,
    });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully.",
      data: subscriber,
    });
  } catch (error) {
    console.error("CREATE NEWSLETTER SUBSCRIBER ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message:
        error.message ||
        "Unable to subscribe at this time. Please try again later.",
    });
  }
};

module.exports = {
  createSubscriber,
};
