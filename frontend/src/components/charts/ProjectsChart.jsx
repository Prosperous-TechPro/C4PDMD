/**
 * =====================================================
 * PROJECTS CHART
 * =====================================================
 * Displays overall project statistics.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ProjectsChart = ({
  data = [],
  loading = false,
}) => {
  /**
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 h-[360px] animate-pulse">
        <div className="w-full h-full bg-gray-100 rounded-lg" />
      </div>
    );
  }

  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 flex items-center justify-center h-[360px]">
        <p className="text-gray-500">
          No project data available.
        </p>
      </div>
    );
  }

  /**
   * =====================================================
   * COMPONENT
   * =====================================================
   */

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Projects Overview
        </h2>

        <p className="text-sm text-gray-500">
          Overall project distribution across the system.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >

          <defs>

            <linearGradient
              id="projectGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#2563eb"
                stopOpacity={0.1}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            fill="url(#projectGradient)"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ProjectsChart;