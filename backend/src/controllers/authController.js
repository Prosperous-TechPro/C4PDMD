/**
 * =====================================================
 * AUTH CONTROLLER
 * =====================================================
 */

const {
  loginUser,
} = require("../services/authService");
const {
  updateCurrentUserProfile,
} = require("../services/userService");
const {
  issueOtp,
  verifyOtp,
} = require("../services/authOtpService");
const {
  formatPhoneNumber,
} = require("../services/hubtelSmsService");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { prisma } = require("../config/database");
const {
  isStrongPassword,
  strongPasswordMessage,
} = require("../utils/passwordRules");

const resetSecret =
  process.env.JWT_RESET_SECRET ||
  process.env.JWT_ACCESS_SECRET ||
  process.env.JWT_SECRET ||
  "dev_reset_secret_change_this";

/**
 * Login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(error.statusCode || 401).json({
      success: false,
      message: error.message,
    });
  }
};

/** Get current user (protected) */
const me = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber || null,
        role: user.role.name,
        profileImageUrl: user.profileImageUrl || null,
        coverImageUrl: user.coverImageUrl || null,
        displayName: user.displayName || `${user.firstName} ${user.lastName}`.trim(),
        initials: user.initials || "U",
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/** Update current user profile */
const updateMe = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (req.body.email && req.body.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (emailExists) {
        return res.status(409).json({ success: false, message: "Email already in use" });
      }
    }

    let normalizedPhoneNumber = undefined;

    if (req.body.phoneNumber !== undefined) {
      normalizedPhoneNumber = req.body.phoneNumber ? formatPhoneNumber(req.body.phoneNumber) : null;

      if (normalizedPhoneNumber && normalizedPhoneNumber !== existingUser.phoneNumber) {
        const phoneExists = await prisma.user.findUnique({
          where: { phoneNumber: normalizedPhoneNumber },
        });

        if (phoneExists) {
          return res.status(409).json({ success: false, message: "Phone number already in use" });
        }
      }
    }

    if (req.body.newPassword || req.body.currentPassword) {
      if (!req.body.currentPassword || !req.body.newPassword) {
        return res.status(400).json({ success: false, message: "Current password and new password are required" });
      }

      const passwordMatch = await bcrypt.compare(req.body.currentPassword, existingUser.password);

      if (!passwordMatch) {
        return res.status(400).json({ success: false, message: "Current password is incorrect" });
      }

      if (!isStrongPassword(req.body.newPassword)) {
        return res.status(400).json({ success: false, message: strongPasswordMessage });
      }
    }

    const user = await updateCurrentUserProfile(userId, {
      ...req.body,
      phoneNumber: normalizedPhoneNumber,
      password: req.body.newPassword,
      profileImageUrl: req.body.profileImageUrl === "" ? null : req.body.profileImageUrl,
      coverImageUrl: req.body.coverImageUrl === "" ? null : req.body.coverImageUrl,
    });
    const refreshedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    const normalizedUser = {
      id: refreshedUser.id,
      firstName: refreshedUser.firstName,
      lastName: refreshedUser.lastName,
      email: refreshedUser.email,
      phoneNumber: refreshedUser.phoneNumber || null,
      role: refreshedUser.role?.name || null,
      profileImageUrl: refreshedUser.profileImageUrl || null,
      coverImageUrl: refreshedUser.coverImageUrl || null,
      displayName: refreshedUser.displayName || `${refreshedUser.firstName} ${refreshedUser.lastName}`.trim() || refreshedUser.email,
      initials: refreshedUser.initials || `${(refreshedUser.firstName || "")[0] || ""}${(refreshedUser.lastName || "")[0] || ""}`.toUpperCase() || "U",
    };

    const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
    const accessToken = generateAccessToken(refreshedUser);
    const refreshToken = generateRefreshToken(refreshedUser);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: normalizedUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/** Refresh access token */
const refresh = async (req, res) => {
  try {
    const refreshToken = req.body?.refreshToken || req.headers["x-refresh-token"];

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.id }, include: { role: true } });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

    const accessToken = generateAccessToken(user);
    const newRefresh = generateRefreshToken(user);

    return res.status(200).json({ success: true, accessToken, refreshToken: newRefresh });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
  }
};

/** Logout (client-side token removal recommended) */
const logout = async (req, res) => {
  try {
    // stateless logout - client should remove tokens
    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/** Forgot password - sends SMS OTP */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // don't reveal user existence
      return res.status(200).json({ success: true, message: "If the email exists, a verification code has been sent to the registered phone number." });
    }

    if (!user.phoneNumber) {
      return res.status(400).json({ success: false, message: "No phone number is registered for this account." });
    }

    await issueOtp({ user, purpose: "PASSWORD_RESET" });

    return res.status(200).json({
      success: true,
      message: "If the email exists, a verification code has been sent to the registered phone number.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/** Reset password using SMS OTP */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ success: false, message: "Email, OTP and password are required" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ success: false, message: strongPasswordMessage });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.phoneNumber) {
      return res.status(400).json({ success: false, message: "No phone number is registered for this account." });
    }

    await verifyOtp({ user, purpose: "PASSWORD_RESET", otp });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

    return res.status(200).json({ success: true, message: "Password has been reset" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Register a new user and send SMS verification code
 */
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Basic validation
    if (!email || !password || !phoneNumber) {
      return res.status(400).json({ success: false, message: "Email, phone number and password are required" });
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ success: false, message: strongPasswordMessage });
    }

    const normalizedPhoneNumber = formatPhoneNumber(phoneNumber);

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }

    const phoneExists = await prisma.user.findUnique({ where: { phoneNumber: normalizedPhoneNumber } });

    if (phoneExists) {
      return res.status(409).json({ success: false, message: "Phone number already in use" });
    }

    // Assign safe default role for public registrations
    let role = await prisma.role.findFirst({ where: { name: "User" } });
    if (!role) {
      role = await prisma.role.create({ data: { name: "User" } });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: firstName || "",
        lastName: lastName || "",
        email,
        password: hashed,
        phoneNumber: normalizedPhoneNumber,
        // Public registrations are created as USER and require SMS verification.
        // They are not staff and therefore will not have dashboard access.
        status: "PENDING",
        roleId: role.id,
        isStaff: false,
        isVerified: false,
        profileImageUrl: null,
        coverImageUrl: null,
      },
      include: { role: true },
    });

    let otpResult = null;
    const verificationRequired = true;

    try {
      otpResult = await issueOtp({ user, purpose: "REGISTRATION" });
    } catch (otpError) {
      await prisma.user.delete({ where: { id: user.id } });
      return res.status(503).json({ success: false, message: otpError.message });
    }

    const otpMessage = process.env.NODE_ENV === "production"
      ? "Account created. Enter the SMS code to verify your account."
      : `Account created. Enter the verification code ${otpResult.code} to verify your account.`;

    return res.status(201).json({
      success: true,
      verificationRequired,
      message: otpMessage,
      verificationCode: process.env.NODE_ENV !== "production" ? otpResult.code : undefined,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role.name,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/** Verify registration OTP and activate account */
const verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.phoneNumber) {
      return res.status(400).json({ success: false, message: "No phone number is registered for this account." });
    }

    if (user.status !== "ACTIVE") {
      await verifyOtp({ user, purpose: "REGISTRATION", otp });

      // Mark user as verified. If the account is a staff account (isStaff=true), keep it PENDING
      // so an administrator must approve it explicitly. Public users (isStaff=false) become ACTIVE.
      const newStatus = user.isStaff ? user.status || "PENDING" : "ACTIVE";

      await prisma.user.update({
        where: { id: user.id },
        data: { status: newStatus, isVerified: true },
      });
    }

    const activatedUser = await prisma.user.findUnique({ where: { id: user.id }, include: { role: true } });
    const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

    const accessToken = generateAccessToken(activatedUser);
    const refreshToken = generateRefreshToken(activatedUser);

    return res.status(200).json({
      success: true,
      message: "Account verified successfully.",
      user: {
        id: activatedUser.id,
        firstName: activatedUser.firstName,
        lastName: activatedUser.lastName,
        email: activatedUser.email,
        phoneNumber: activatedUser.phoneNumber || null,
        role: activatedUser.role.name,
        profileImageUrl: activatedUser.profileImageUrl || null,
        coverImageUrl: activatedUser.coverImageUrl || null,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ success: false, message: error.message });
  }
};

module.exports = {
  login,
  me,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  register,
  verifyRegistrationOtp,
  updateMe,
};