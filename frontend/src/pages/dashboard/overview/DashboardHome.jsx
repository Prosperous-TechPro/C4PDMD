/**
 * =====================================================
 * DASHBOARD HOME
 * =====================================================
 * Dashboard landing page for the C4PDMD Admin Panel.
 *
 * Features:
 * - Dashboard Header
 * - KPI Statistics Cards
 * - Loading State
 * - Error Handling
 * - React Query Integration
 *
 * Author: Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useQuery } from "@tanstack/react-query";

import {
  FaUsers,
  FaUserFriends,
  FaProjectDiagram,
  FaServicestack,
  FaNewspaper,
  FaImages,
  FaHandshake,
  FaDonate,
  FaEnvelope,
} from "react-icons/fa";

import { getDashboardStats } from "../../../api/dashboard/dashboardApi";

import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import StatsCard from "../../../components/cards/StatsCard";
import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const DashboardHome = () => {
  /**
   * =====================================================
   * FETCH DASHBOARD DATA
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardStats,
  });

  /**
   * =====================================================
   * LOADING STATE
   * =====================================================
   */

  if (isLoading) {
    return <PageLoader />;
  }

  /**
   * =====================================================
   * ERROR STATE
   * =====================================================
   */

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load dashboard statistics."
      />
    );
  }

  /**
   * =====================================================
   * DASHBOARD OVERVIEW DATA
   * =====================================================
   */

  const stats = data?.data?.overview || {};

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      {/* ========================================= */}
      {/* DASHBOARD HEADER */}
      {/* ========================================= */}

      <DashboardHeader />

      {/* ========================================= */}
      {/* KPI CARDS */}
      {/* ========================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

        <StatsCard
          title="Users"
          value={stats.totalUsers || 0}
          icon={<FaUsers />}
          description="Registered system users"
          color="bg-blue-600"
        />

        <StatsCard
          title="Team Members"
          value={stats.totalTeamMembers || 0}
          icon={<FaUserFriends />}
          description="Organization staff"
          color="bg-indigo-600"
        />

        <StatsCard
          title="Projects"
          value={stats.totalProjects || 0}
          icon={<FaProjectDiagram />}
          description="Active development projects"
          color="bg-purple-600"
        />

        <StatsCard
          title="Services"
          value={stats.totalServices || 0}
          icon={<FaServicestack />}
          description="Available services"
          color="bg-green-600"
        />

        <StatsCard
          title="Blog Posts"
          value={stats.totalBlogPosts || 0}
          icon={<FaNewspaper />}
          description="Published articles"
          color="bg-orange-500"
        />

        <StatsCard
          title="Gallery"
          value={stats.totalGalleryImages || 0}
          icon={<FaImages />}
          description="Uploaded images"
          color="bg-pink-600"
        />

        <StatsCard
          title="Partners"
          value={stats.totalPartners || 0}
          icon={<FaHandshake />}
          description="Partner organizations"
          color="bg-cyan-600"
        />

        <StatsCard
          title="Donations"
          value={stats.totalDonations || 0}
          icon={<FaDonate />}
          description="Recorded donations"
          color="bg-emerald-600"
        />

        <StatsCard
          title="Messages"
          value={stats.totalMessages || 0}
          icon={<FaEnvelope />}
          description="Contact messages"
          color="bg-red-600"
        />

        <StatsCard
          title="Volunteers"
          value={stats.totalVolunteers || 0}
          icon={<FaUserFriends />}
          description="Volunteer applications"
          color="bg-yellow-500"
        />

      </div>

    </div>
  );
};

export default DashboardHome;