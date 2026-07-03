/**
 * =====================================================
 * AUTH OTP SERVICE
 * =====================================================
 * Creates and verifies OTPs for registration and password reset.
 * =====================================================
 */

const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { prisma } = require("../config/database");
const hubtelSmsService = require("./hubtelSmsService");

const OTP_EXPIRY_MINUTES = Number(
  process.env.AUTH_OTP_EXPIRY_MINUTES || 10
);

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const buildMessage = ({ purpose, otp }) => {
  if (purpose === "REGISTRATION") {
    return `Your C4PDMD account verification code is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`;
  }

  if (purpose === "PASSWORD_RESET") {
    return `Your C4PDMD password reset code is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`;
  }

  return `Your C4PDMD verification code is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`;
};

const getOtpRecord = async ({ userId, purpose }) => {
  return prisma.authOtp.findFirst({
    where: {
      userId,
      purpose,
      usedAt: null,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const issueOtp = async ({ user, purpose }) => {
  const code = generateOTP();
  const codeHash = await bcrypt.hash(code, 12);
  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  );

  await prisma.authOtp.deleteMany({
    where: {
      userId: user.id,
      purpose,
      usedAt: null,
    },
  });

  const otpRecord = await prisma.authOtp.create({
    data: {
      userId: user.id,
      purpose,
      phoneNumber: user.phoneNumber,
      codeHash,
      expiresAt,
    },
  });

  const message = buildMessage({ purpose, otp: code });
  let sent = false;

  try {
    sent = await hubtelSmsService.sendSMS(
      user.phoneNumber,
      message,
      `${purpose}_${user.id}_${otpRecord.id}`
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("SMS delivery failed, using development fallback OTP.", error.message);
      sent = true;
    } else {
      await prisma.authOtp.delete({ where: { id: otpRecord.id } });
      throw error;
    }
  }

  if (!sent) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("SMS delivery returned false, using development fallback OTP.");
      sent = true;
    } else {
      await prisma.authOtp.delete({ where: { id: otpRecord.id } });
      const error = new Error("Failed to send SMS verification code.");
      error.statusCode = 503;
      throw error;
    }
  }

  return {
    success: true,
    purpose,
    expiresAt,
    code,
  };
};

const verifyOtp = async ({ user, purpose, otp }) => {
  const otpRecord = await getOtpRecord({
    userId: user.id,
    purpose,
  });

  if (!otpRecord) {
    const error = new Error("OTP not found or expired.");
    error.statusCode = 404;
    throw error;
  }

  const isValid = await bcrypt.compare(otp, otpRecord.codeHash);

  if (!isValid) {
    const error = new Error("Invalid OTP.");
    error.statusCode = 400;
    throw error;
  }

  await prisma.authOtp.update({
    where: { id: otpRecord.id },
    data: { usedAt: new Date() },
  });

  return {
    success: true,
    verified: true,
  };
};

module.exports = {
  issueOtp,
  verifyOtp,
};