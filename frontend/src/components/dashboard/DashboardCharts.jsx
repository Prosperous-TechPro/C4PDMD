/**
 * =====================================================
 * DASHBOARD CHARTS
 * =====================================================
 * Displays Dashboard Analytics.
 *
 * Uses dashboard overview statistics passed from
 * DashboardHome to avoid unnecessary API requests.
 *
 * Author: Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashboardCharts = ({ overview }) => {

  /**
   * =====================================================
   * CHART DATA
   * =====================================================
   */

  const chartData = [
    {
      name: "Users",
      total: overview?.totalUsers ?? 0,
    },
    {
      name: "Team",
      total: overview?.totalTeamMembers ?? 0,
    },
    {
      name: "Services",
      total: overview?.totalServices ?? 0,
    },
    {
      name: "Projects",
      total: overview?.totalProjects ?? 0,
    },
    {
      name: "Blogs",
      total: overview?.totalBlogPosts ?? 0,
    },
    {
      name: "Gallery",
      total: overview?.totalGalleryImages ?? 0,
    },
    {
      name: "Partners",
      total: overview?.totalPartners ?? 0,
    },
    {
      name: "Volunteers",
      total: overview?.totalVolunteers ?? 0,
    },
    {
      name: "Messages",
      total: overview?.totalMessages ?? 0,
    },
    {
      name: "Donations",
      total: overview?.totalDonations ?? 0,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">

      {/* ================================ */}
      {/* Title */}
      {/* ================================ */}

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Dashboard Analytics
      </h2>

      {/* ================================ */}
      {/* Chart */}
      {/* ================================ */}

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="total"
            fill="#0A4D8C"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default DashboardCharts;