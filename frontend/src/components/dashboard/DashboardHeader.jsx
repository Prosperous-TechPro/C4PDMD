/**
 * =====================================================
 * DASHBOARD HEADER
 * =====================================================
 * Displays dashboard title, date and action button.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD
 * =====================================================
 */

import { FaPlus } from "react-icons/fa";

const DashboardHeader = () => {

  const today = new Date().toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the C4PDMD Management Dashboard.
        </p>

        <p className="text-sm text-blue-600 mt-1">
          {today}
        </p>

      </div>

      <button
        className="
        mt-5
        md:mt-0
        bg-[#0A4D8C]
        hover:bg-[#083b69]
        text-white
        px-5
        py-3
        rounded-lg
        flex
        items-center
        gap-2
        transition-all
        "
      >
        <FaPlus />

        Quick Action
      </button>

    </div>
  );
};

export default DashboardHeader;