/**
 * =====================================================
 * HUBTEL SMS SERVICE
 * =====================================================
 * Sends SMS messages through Hubtel.
 * =====================================================
 */

const axios = require("axios");

const HUBTEL_API_URL =
  process.env.HUBTEL_API_URL ||
  "https://smsc.hubtel.com/v1/messages/send";

const isPlaceholderValue = (value) => {
  const normalized = String(value || "").trim().toLowerCase();

  return (
    !normalized ||
    normalized.startsWith("your_") ||
    normalized.startsWith("change_this") ||
    normalized.startsWith("replace_")
  );
};

const getCredentials = () => {
  const clientId = String(
    process.env.HUBTEL_CLIENT_ID ||
      process.env.HUBTEL_SMS_CLIENT_ID ||
      ""
  ).trim();
  const clientSecret = String(
    process.env.HUBTEL_CLIENT_SECRET ||
      process.env.HUBTEL_SMS_CLIENT_SECRET ||
      ""
  ).trim();
  const senderId = String(
    process.env.HUBTEL_SENDER_ID ||
      process.env.HUBTEL_SMS_FROM ||
      ""
  ).trim();

  if (
    !clientId ||
    !clientSecret ||
    !senderId ||
    isPlaceholderValue(clientId) ||
    isPlaceholderValue(clientSecret) ||
    isPlaceholderValue(senderId)
  ) {
    const error = new Error(
      "Hubtel SMS credentials are not configured. Set HUBTEL_CLIENT_ID/HUBTEL_CLIENT_SECRET/HUBTEL_SENDER_ID or the HUBTEL_SMS_* values in backend/.env."
    );
    error.statusCode = 503;
    throw error;
  }

  return { clientId, clientSecret, senderId };
};

const formatPhoneNumber = (phoneNumber) => {
  let cleaned = String(phoneNumber || "").replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = `233${cleaned.substring(1)}`;
  } else if (!cleaned.startsWith("233")) {
    cleaned = `233${cleaned}`;
  }

  return `+${cleaned}`;
};

const sendSMS = async (phoneNumber, message, reference) => {
  try {
    const { clientId, clientSecret, senderId } = getCredentials();
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await axios.post(
      HUBTEL_API_URL,
      {
        From: senderId,
        To: formattedPhone,
        Content: message,
        ClientReference: reference || `c4pdmd_${Date.now()}`,
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data?.status === "Success" || response.status === 200;
  } catch (error) {
    console.error("Hubtel SMS Error:", error.response?.data || error.message);

    if (process.env.NODE_ENV !== "production") {
      console.warn("Using development fallback for SMS delivery.");
      return true;
    }

    if (error.statusCode === 503) {
      throw error;
    }

    return false;
  }
};

module.exports = {
  sendSMS,
  formatPhoneNumber,
};