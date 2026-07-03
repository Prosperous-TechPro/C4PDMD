/**
 * =====================================================
 * PAYSTACK SERVICE
 * =====================================================
 * Handles Paystack payment initialization and verification.
 * =====================================================
 */

const axios = require("axios");
const crypto = require("crypto");

const PAYSTACK_BASE_URL =
  process.env.PAYSTACK_BASE_URL ||
  "https://api.paystack.co";

const getSecretKey = () => {
  const secretKey =
    process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    const error = new Error(
      "PAYSTACK_SECRET_KEY is not configured."
    );
    error.statusCode = 503;
    throw error;
  }

  return secretKey;
};

const getClient = () => {
  return axios.create({
    baseURL: PAYSTACK_BASE_URL,
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });
};

const initializeTransaction = async ({
  email,
  amount,
  callbackUrl,
  metadata,
}) => {
  try {
    const client = getClient();

    const response = await client.post(
      "/transaction/initialize",
      {
        email,
        amount: Math.round(Number(amount) * 100),
        callback_url: callbackUrl,
        metadata,
      }
    );

    if (!response.data?.status) {
      const error = new Error(
        response.data?.message ||
          "Failed to initialize donation checkout."
      );
      error.statusCode = 502;
      throw error;
    }

    return {
      authorizationUrl:
        response.data.data.authorization_url,
      reference: response.data.data.reference,
      currency:
        response.data.data.currency || "GHS",
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to initialize donation checkout.";
    const wrappedError = new Error(message);
    wrappedError.statusCode =
      error.response?.status ||
      error.statusCode ||
      502;
    throw wrappedError;
  }
};

const verifyTransaction = async (reference) => {
  try {
    const client = getClient();

    const response = await client.get(
      `/transaction/verify/${reference}`
    );

    if (!response.data?.status) {
      const error = new Error(
        response.data?.message ||
          "Failed to verify donation payment."
      );
      error.statusCode = 502;
      throw error;
    }

    return {
      transaction: response.data.data,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to verify donation payment.";
    const wrappedError = new Error(message);
    wrappedError.statusCode =
      error.response?.status ||
      error.statusCode ||
      502;
    throw wrappedError;
  }
};

const verifyWebhookSignature = (rawBody, signature) => {
  if (!rawBody || !signature) {
    return false;
  }

  const bodyBuffer = Buffer.isBuffer(rawBody)
    ? rawBody
    : Buffer.from(rawBody);

  const expectedSignature = crypto
    .createHmac("sha512", getSecretKey())
    .update(bodyBuffer)
    .digest("hex");

  return expectedSignature === signature;
};

module.exports = {
  initializeTransaction,
  verifyTransaction,
  verifyWebhookSignature,
};