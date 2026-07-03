/**
 * =====================================================
 * AUTH SERVICE
 * =====================================================
 * Handles authentication business logic
 * =====================================================
 */

const bcrypt = require("bcrypt");

const { prisma } = require("../config/database");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

/**
 * Login User
 */
const loginUser = async (email, password) => {

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    const error = new Error("Account not found. Please check your email or register.");
    error.statusCode = 404;
    throw error;
  }

  if (user.status && user.status !== "ACTIVE") {
    const error = new Error("This account is inactive. Please contact support.");
    error.statusCode = 403;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    const error = new Error("Incorrect password. Please try again.");
    error.statusCode = 401;
    throw error;
  }

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || null,
      role: user.role.name,
      profileImageUrl: user.profileImageUrl || null,
      coverImageUrl: user.coverImageUrl || null,
      displayName: [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.email,
      initials: `${(user.firstName || "")[0] || ""}${(user.lastName || "")[0] || ""}`.toUpperCase() || "U",
      status: user.status || "ACTIVE",
      isVerified: !!user.isVerified,
      isStaff: !!user.isStaff,
    },

    accessToken: generateAccessToken(user),

    refreshToken: generateRefreshToken(user),
  };
};

module.exports = {
  loginUser,
};