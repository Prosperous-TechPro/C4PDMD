/**
 * =====================================================
 * RECENT ACTIVITIES COMPONENT
 * =====================================================
 * Displays the latest dashboard activities.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import {
  Clock,
  FolderKanban,
  FileText,
  HeartHandshake,
  Mail,
  DollarSign,
} from "lucide-react";

const icons = {
  Project: (
    <FolderKanban
      className="w-5 h-5"
    />
  ),

  Blog: (
    <FileText
      className="w-5 h-5"
    />
  ),

  Volunteer: (
    <HeartHandshake
      className="w-5 h-5"
    />
  ),

  Contact: (
    <Mail
      className="w-5 h-5"
    />
  ),

  Donation: (
    <DollarSign
      className="w-5 h-5"
    />
  ),
};

const colors = {
  Project: "bg-blue-100 text-blue-600",

  Blog: "bg-green-100 text-green-600",

  Volunteer:
    "bg-purple-100 text-purple-600",

  Contact:
    "bg-yellow-100 text-yellow-600",

  Donation:
    "bg-red-100 text-red-600",
};

const RecentActivities = ({
  activities = [],
  loading = false,
}) => {
  /**
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">

        <div className="animate-pulse space-y-4">

          {[...Array(6)].map(
            (_, index) => (
              <div
                key={index}
                className="h-16 rounded-lg bg-gray-100"
              />
            )
          )}

        </div>

      </div>
    );
  }

  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (!activities.length) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">

        <Clock className="mx-auto w-10 h-10 text-gray-400" />

        <p className="mt-3 text-gray-500">
          No recent activities found.
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
    <div className="bg-white rounded-xl shadow">

      <div className="border-b px-6 py-4">

        <h2 className="text-xl font-semibold">
          Recent Activities
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Latest updates across the system.
        </p>

      </div>

      <div className="divide-y">

        {activities.map(
          (activity) => (

            <div
              key={`${activity.type}-${activity.createdAt}-${activity.title}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    colors[
                      activity.type
                    ] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {icons[
                    activity.type
                  ] || (
                    <Clock className="w-5 h-5" />
                  )}
                </div>

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {activity.type}
                  </p>

                </div>

              </div>

              <div className="text-sm text-gray-400">

                {new Date(
                  activity.createdAt
                ).toLocaleString()}

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
};

export default RecentActivities;