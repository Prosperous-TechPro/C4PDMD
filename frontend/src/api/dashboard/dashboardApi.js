/**
 * =====================================================
 * DASHBOARD API
 * =====================================================
 * Handles all Dashboard API requests.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import API from "../axios";

/**
 * =====================================================
 * GET DASHBOARD STATISTICS
 * =====================================================
 */

export const getDashboardStats = async () => {
  const response = await API.get(
    "/dashboard/stats"
  );

  return response.data;
};

/**
 * =====================================================
 * GET DASHBOARD CHART DATA
 * =====================================================
 */

export const getDashboardCharts = async () => {
  const response = await API.get(
    "/dashboard/charts"
  );

  return response.data;
};

/**
 * =====================================================
 * GET RECENT ACTIVITIES
 * =====================================================
 */

export const getRecentActivities =
  async () => {
    const response =
      await API.get(
        "/dashboard/recent"
      );

    return response.data;
  };