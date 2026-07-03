/**
 * =====================================================
 * SETTINGS API
 * =====================================================
 * Handles Organization Settings API Requests
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET ORGANIZATION SETTINGS
 * =====================================================
 * GET /api/settings
 * =====================================================
 */

export const getSettings = async () => {
  const response = await API.get(
    "/settings"
  );

  return response.data;
};

/**
 * =====================================================
 * UPDATE ORGANIZATION SETTINGS
 * =====================================================
 * PUT /api/settings
 * =====================================================
 */

export const updateSettings = async (
  data
) => {
  const response = await API.put(
    "/settings",
    data
  );

  return response.data;
};

/**
 * =====================================================
 * UPLOAD ORGANIZATION LOGO
 * =====================================================
 * Uses existing Cloudinary upload endpoint
 * =====================================================
 */

export const uploadLogo = async (
  formData
) => {
  const response = await API.post(
    "/upload/image",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * =====================================================
 * UPLOAD FAVICON
 * =====================================================
 */

export const uploadFavicon =
  async (formData) => {
    const response =
      await API.post(
        "/upload/image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };