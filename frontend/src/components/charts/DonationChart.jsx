/**
 * =====================================================
 * DONATION CHART
 * =====================================================
 * Displays donation statistics using Recharts.
 *
 * Author : Lucky + ChatGPT
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
} from "recharts";

const DonationChart = ({
  data = [],
  loading = false,
}) => {
  /**
   * =====================================================
   * LOADING STATE
   * =====================================================
   */

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 h-[360px] animate-pulse">
        <div className="h-full bg-gray-100 rounded-lg" />
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
          No donation data available.
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
          Donations Overview
        </h2>

        <p className="text-sm text-gray-500">
          Total donations recorded in the system.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            radius={[
              8,
              8,
              0,
              0,
            ]}
            fill="#2563eb"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default DonationChart;