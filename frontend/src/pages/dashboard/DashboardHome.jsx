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
import { getDonationStats } from "../../api/donations/donationApi";

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
    staleTime: 1000,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: chartsData,
    isLoading: chartsLoading,
  } = useQuery({
    queryKey: ["dashboardCharts"],
    queryFn: getDashboardCharts,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: activitiesData,
    isLoading: activitiesLoading,
  } = useQuery({
    queryKey: ["dashboardRecent"],
    queryFn: getRecentActivities,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const { data: donationStatsData } = useQuery({
    queryKey: ["donationStats"],
    queryFn: getDonationStats,
    staleTime: 2000,
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
  const availableBalance = donationStatsData?.data?.totalAmount ?? null;

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

  const dashboardCards = [
    {
      title: "Users",
      value: stats.totalUsers ?? 0,
      icon: <Users />,
      color: "bg-blue-600",
      route: "/dashboard/users",
      buttonLabel: "Manage Users",
    },
    {
      title: "Team",
      value: stats.totalTeamMembers ?? 0,
      icon: <Briefcase />,
      color: "bg-green-600",
      route: "/dashboard/team",
      buttonLabel: "Manage Team",
    },
    {
      title: "Projects",
      value: stats.totalProjects ?? 0,
      icon: <FolderKanban />,
      color: "bg-purple-600",
      route: "/dashboard/projects",
      buttonLabel: "Manage Projects",
    },
    {
      title: "Services",
      value: stats.totalServices ?? 0,
      icon: <Wrench />,
      color: "bg-orange-600",
      route: "/dashboard/services",
      buttonLabel: "Manage Services",
    },
    {
      title: "Blogs",
      value: stats.totalBlogPosts ?? 0,
      icon: <Newspaper />,
      color: "bg-indigo-600",
      route: "/dashboard/blogs",
      buttonLabel: "Manage Blogs",
    },
    {
      title: "Gallery",
      value: stats.totalGalleryImages ?? 0,
      icon: <Image />,
      color: "bg-pink-600",
      route: "/dashboard/gallery",
      buttonLabel: "Manage Gallery",
    },
    {
      title: "Volunteers",
      value: stats.totalVolunteers ?? 0,
      icon: <HeartHandshake />,
      color: "bg-cyan-600",
      route: "/dashboard/volunteers",
      buttonLabel: "Manage Volunteers",
    },
    {
      title: "Donations",
      value: `GH₵ ${stats.totalDonationAmount ?? 0}`,
      icon: <HandCoins />,
      color: "bg-emerald-600",
      route: "/dashboard/donations",
      buttonLabel: "Manage Donations",
    },
    {
      title: "Available Balance",
      value: availableBalance !== null ? `GH₵ ${Number(availableBalance).toLocaleString()}` : "—",
      icon: <HandCoins />,
      color: "bg-rose-600",
      route: "/dashboard/donations",
      buttonLabel: "View Withdrawals",
    },
    {
      title: "Partners",
      value: stats.totalPartners ?? 0,
      icon: <Handshake />,
      color: "bg-yellow-600",
      route: "/dashboard/partners",
      buttonLabel: "Manage Partners",
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials ?? 0,
      icon: <FileText />,
      color: "bg-red-600",
      route: "/dashboard/testimonials",
      buttonLabel: "Manage Testimonials",
    },
    {
      title: "Messages",
      value: stats.totalMessages ?? 0,
      icon: <MessageSquare />,
      color: "bg-slate-700",
      route: "/dashboard/messages",
      buttonLabel: "Manage Messages",
    },
  ];

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
        {dashboardCards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            route={card.route}
            buttonLabel={card.buttonLabel}
          />
        ))}
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