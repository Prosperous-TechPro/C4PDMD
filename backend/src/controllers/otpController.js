/**
 * =====================================================
 * OTP CONTROLLER
 * =====================================================
 */

const {
  sendOTP,
  verifyOTP
} = require("../services/otpService");

/**
 * SEND OTP
 */

const sendOTPController =
  async (req, res) => {

    try {

      const {
        phoneNumber
      } = req.body;

      const result =
        await sendOTP(
          phoneNumber
        );

      res.status(200).json({
        success: true,
        data: result
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };

/**
 * VERIFY OTP
 */

const verifyOTPController =
  async (req, res) => {

    try {

      const {
        phoneNumber,
        otp
      } = req.body;

      const result =
        verifyOTP(
          phoneNumber,
          otp
        );

      res.status(200).json({
        success: true,
        data: result
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message
      });

    }

  };

module.exports = {
  sendOTPController,
  verifyOTPController
};