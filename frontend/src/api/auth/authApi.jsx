/**
 * =====================================================
 * AUTH API
 * =====================================================
 * Handles Authentication Requests
 * =====================================================
 */

import API from "../axios";

/**
 * ======================================
 * LOGIN
 * ======================================
 */

export const loginUser = async (
  credentials
) => {
  const response =
    await API.post(
      "/auth/login",
      credentials
    );

  return response.data;
};

/**
 * REGISTER
 */
export const registerUser = async (payload) => {
  const response = await API.post("/auth/register", payload);
  return response.data;
};

/**
 * VERIFY REGISTRATION OTP
 */
export const verifyRegistrationOtp = async (payload) => {
  const response = await API.post("/auth/verify-registration-otp", payload);
  return response.data;
};

/**
 * ======================================
 * GET CURRENT USER
 * ======================================
 */

export const getCurrentUser =
  async () => {
    const response =
      await API.get("/auth/me");

    return response.data;
  };

/**
 * ======================================
 * UPDATE CURRENT USER
 * ======================================
 */

export const updateCurrentUser = async (payload) => {
  const response = await API.put("/auth/me", payload);
  return response.data;
};

/**
 * FORGOT PASSWORD
 */

export const forgotPassword = async (payload) => {
  const response = await API.post("/auth/forgot-password", payload);
  return response.data;
};

/**
 * RESET PASSWORD
 */

export const resetPassword = async (payload) => {
  const response = await API.post("/auth/reset-password", payload);
  return response.data;
};

/**
 * ======================================
 * LOGOUT
 * ======================================
 */

export const logoutUser =
  async () => {
    const response =
      await API.post(
        "/auth/logout"
      );

    return response.data;
  };

/**
 * ======================================
 * REFRESH TOKEN
 * ======================================
 */

export const refreshToken =
  async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await API.post(
      "/auth/refresh",
      { refreshToken }
    );

    return response.data;
  };