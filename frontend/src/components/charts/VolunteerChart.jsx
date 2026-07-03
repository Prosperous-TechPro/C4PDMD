/**
 * =====================================================
 * VOLUNTEER CHART
 * =====================================================
 * Displays volunteer statistics using Recharts.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#8b5cf6",
  "#0ea5e9",
];

const VolunteerChart = ({
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
        <div className="h-full rounded-lg bg-gray-100" />
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
          No volunteer data available.
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
          Volunteers Overview
        </h2>

        <p className="text-sm text-gray-500">
          Distribution of volunteers across the system.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default VolunteerChart;