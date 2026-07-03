/**
 * =====================================================
 * JWT TOKEN GENERATOR
 * =====================================================
 * Creates Access Token and Refresh Token
 * =====================================================
 */

const jwt = require("jsonwebtoken");

/**
 * Generate Access Token
 */
const generateAccessToken = (user) => {
  const accessSecret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "dev_access_secret_change_this";

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role?.name || user.role,
      status: user.status || "ACTIVE",
      isStaff: user.isStaff || false,
      isVerified: user.isVerified || false,
    },
    accessSecret,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE || "7d",
    }
  );
};

/**
 * Generate Refresh Token
 */
const generateRefreshToken = (user) => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET || "dev_refresh_secret_change_this";

  return jwt.sign(
    {
      id: user.id,
    },
    refreshSecret,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || "30d",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};