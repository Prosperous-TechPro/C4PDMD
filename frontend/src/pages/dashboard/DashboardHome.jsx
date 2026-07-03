/**
 * =====================================================
 * DASHBOARD HOME
 * =====================================================
 * Main Dashboard Analytics Page
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useAuth } from "../../contexts/AuthContext";

import {
  Users,
  Briefcase,
  FolderKanban,
  Newspaper,
  Image,
  HeartHandshake,
  HandCoins,
  Handshake,
  MessageSquare,
  FileText,
  Wrench,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
  getDashboardCharts,
  getRecentActivities,
} from "../../api/dashboard/dashboardApi";

import StatsCard from "../../components/cards/StatsCard";

import DonationChart from "../../components/charts/DonationChart";
import VolunteerChart from "../../components/charts/VolunteerChart";
import ProjectsChart from "../../components/charts/ProjectsChart";

import RecentActivities from "../../components/dashboard/RecentActivities";
import RecentPanel from "../../components/dashboard/RecentPanel";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";

const DashboardHome = () => {
  const { user } = useAuth();

  /**
   * =====================================================
   * FETCH DATA
   * =====================================================
   */

  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    refetchInterval: 10000,
  });

  const {
    data: chartsData,
    isLoading: chartsLoading,
  } = useQuery({
    queryKey: ["dashboardCharts"],
    queryFn: getDashboardCharts,
  });

  const {
    data: activitiesData,
    isLoading: activitiesLoading,
  } = useQuery({
    queryKey: ["dashboardRecent"],
    queryFn: getRecentActivities,
  });

  if (statsLoading) {
    return <PageLoader />;
  }

  if (statsError) {
    return (
      <ErrorMessage message="Failed to load dashboard." />
    );
  }

  const stats =
    statsData?.data?.overview || {};

  const charts =
    chartsData?.data || [];

  const activities =
    activitiesData?.data || [];

  const displayName =
    user?.firstName || "Administrator";

  const totalDonationAmount =
    stats.totalDonationAmount ?? 0;

  const totalDonations =
    stats.totalDonations ?? 0;

  const pendingVolunteers =
    stats.pendingVolunteers ?? 0;

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      {/* ====================================== */}
      {/* HERO */}
      {/* ====================================== */}

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">

        <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-sky-500 mb-3">
                Welcome back
              </p>

              <h1 className="text-4xl font-semibold text-slate-900">
                Hello, {displayName}
              </h1>

              <p className="text-sm text-slate-500 mt-3 max-w-2xl">
                Your enterprise NGO dashboard for monitoring users, projects, volunteers, donations and content.
              </p>

            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-sm min-w-[240px]">
              <p className="text-sm text-slate-500 uppercase tracking-[0.18em]">
                Today
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {today}
              </p>
            </div>

          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Donations Today</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">GH₵ {totalDonationAmount.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Total Donations</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{totalDonations}</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Pending Volunteers</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{pendingVolunteers}</p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Total Messages</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalMessages ?? 0}</p>
            </div>
          </div>

        </div>

        <div className="space-y-6">

          <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-6">
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-4">
              Organization
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-700 flex items-center justify-center text-white text-xl font-bold">
                C4
              </div>
              <div>
                <p className="font-semibold text-slate-900">C4PDMD</p>
                <p className="text-sm text-slate-500">Center for Prim-Data Measurement and Development</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                <p className="text-xs text-slate-500">Role</p>
                <p className="mt-2 font-medium text-slate-900">{user?.role ?? "Administrator"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                <p className="text-xs text-slate-500">Email</p>
                <p className="mt-2 font-medium text-slate-900 truncate">{user?.email ?? "admin@c4pdmd.org"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[30px] border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">
                Quick Actions
              </p>
              <span className="text-xs text-slate-400">Faster workflows</span>
            </div>
            <div className="mt-6 grid gap-3">
              <button onClick={() => window.location.href = '/dashboard/projects'} className="w-full rounded-2xl bg-blue-600 text-white py-3 text-left px-5 hover:bg-blue-700 transition">Manage Projects</button>
              <button onClick={() => window.location.href = '/dashboard/services'} className="w-full rounded-2xl border border-slate-200 py-3 text-left px-5 hover:bg-slate-50 transition">Manage Services</button>
              <button onClick={() => window.location.href = '/dashboard/volunteers'} className="w-full rounded-2xl border border-slate-200 py-3 text-left px-5 hover:bg-slate-50 transition">Review Volunteers</button>
            </div>
          </div>

        </div>

      </div>

      {/* ====================================== */}
      {/* STATISTICS */}
      {/* ====================================== */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <p className="text-sm text-gray-500">Common admin tasks</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.location.href = '/dashboard/projects'} className="bg-blue-600 text-white px-4 py-2 rounded">Manage Projects</button>
          <button onClick={() => window.location.href = '/dashboard/services'} className="bg-green-600 text-white px-4 py-2 rounded">Manage Services</button>
          <button onClick={() => window.location.href = '/dashboard/team'} className="bg-purple-600 text-white px-4 py-2 rounded">Manage Team</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatsCard
          title="Users"
          value={stats.totalUsers}
          icon={<Users />}
          color="bg-blue-600"
        />

        <StatsCard
          title="Team"
          value={stats.totalTeamMembers}
          icon={<Briefcase />}
          color="bg-green-600"
        />

        <StatsCard
          title="Projects"
          value={stats.totalProjects}
          icon={<FolderKanban />}
          color="bg-purple-600"
        />

        <StatsCard
          title="Services"
          value={stats.totalServices}
          icon={<Wrench />}
          color="bg-orange-600"
        />

        <StatsCard
          title="Blogs"
          value={stats.totalBlogPosts}
          icon={<Newspaper />}
          color="bg-indigo-600"
        />

        <StatsCard
          title="Gallery"
          value={stats.totalGalleryImages}
          icon={<Image />}
          color="bg-pink-600"
        />

        <StatsCard
          title="Volunteers"
          value={stats.totalVolunteers}
          icon={<HeartHandshake />}
          color="bg-cyan-600"
        />

        <StatsCard
          title="Donations"
          value={`GH₵ ${stats.totalDonationAmount}`}
          icon={<HandCoins />}
          color="bg-emerald-600"
        />

        <StatsCard
          title="Partners"
          value={stats.totalPartners}
          icon={<Handshake />}
          color="bg-yellow-600"
        />

        <StatsCard
          title="Testimonials"
          value={stats.totalTestimonials}
          icon={<FileText />}
          color="bg-red-600"
        />

        <StatsCard
          title="Messages"
          value={stats.totalMessages}
          icon={<MessageSquare />}
          color="bg-slate-700"
        />

      </div>

      {/* ====================================== */}
      {/* CHARTS */}
      {/* ====================================== */}

      <div className="grid lg:grid-cols-2 gap-6">

        <DonationChart
          data={charts}
          loading={chartsLoading}
        />

        <VolunteerChart
          data={charts}
          loading={chartsLoading}
        />

      </div>

      <ProjectsChart
        data={charts}
        loading={chartsLoading}
      />

      <div className="grid xl:grid-cols-[1.4fr_0.8fr] gap-6">
        <RecentActivities
          activities={activities}
          loading={activitiesLoading}
        />
        <RecentPanel title="Quick Summary" items={activities} loading={activitiesLoading} />
      </div>

    </div>
  );
};

export default DashboardHome;