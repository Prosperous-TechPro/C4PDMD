/**
 * =====================================================
 * OTP SERVICE
 * =====================================================
 */

const axios = require("axios");

const generateOTP =
  require("../utils/otpGenerator");

/**
 * Temporary In-Memory Store
 * Replace with Redis in Production
 */

const otpStore = new Map();

/**
 * Send OTP
 */

const sendOTP = async (
  phoneNumber
) => {

  const otp = generateOTP();

  otpStore.set(
    phoneNumber,
    {
      otp,
      createdAt: Date.now()
    }
  );

  const message =
    `Your C4PDMD verification code is ${otp}`;

  const auth =
    Buffer.from(
      `${process.env.HUBTEL_CLIENT_ID}:${process.env.HUBTEL_CLIENT_SECRET}`
    ).toString("base64");

  await axios.post(

    "https://smsc.hubtel.com/v1/messages/send",

    {
      From: process.env.HUBTEL_SENDER_ID,
      To: phoneNumber,
      Content: message
    },

    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json"
      }
    }

  );

  return {
    success: true,
    phoneNumber
  };

};

/**
 * Verify OTP
 */

const verifyOTP = (
  phoneNumber,
  otp
) => {

  const stored =
    otpStore.get(phoneNumber);

  if (!stored) {

    throw new Error(
      "OTP not found"
    );

  }

  if (stored.otp !== otp) {

    throw new Error(
      "Invalid OTP"
    );

  }

  otpStore.delete(phoneNumber);

  return {
    verified: true
  };

};

module.exports = {
  sendOTP,
  verifyOTP
};