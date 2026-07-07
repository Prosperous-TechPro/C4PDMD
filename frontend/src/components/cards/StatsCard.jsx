import { Link } from "react-router-dom";

/**
 * =====================================================
 * STATS CARD COMPONENT
 * =====================================================
 * Reusable Dashboard Statistics Card
 *
 * Features:
 * - Icon
 * - Title
 * - Value
 * - Description
 * - Loading State
 * - Responsive Design
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const StatsCard = ({
  title,
  value,
  icon,
  description = "",
  color = "bg-blue-600",
  loading = false,
  route,
  buttonLabel,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        border-gray-200
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
        flex
        min-h-[220px]
        flex-col
      "
    >
      {/* ===================================== */}
      {/* Header */}
      {/* ===================================== */}

      <div className="flex items-center justify-between">

        <div className="flex-1">

          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            {title}
          </p>

          {loading ? (
            <div className="mt-3 h-10 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
            <h2 className="mt-2 text-4xl font-bold text-gray-800">
              {value}
            </h2>
          )}

        </div>

        <div
          className={`
            ${color}
            h-16
            w-16
            rounded-full
            flex
            items-center
            justify-center
            text-white
            text-2xl
            shadow-md
          `}
        >
          {icon}
        </div>

      </div>

      {/* ===================================== */}
      {/* Footer */}
      {/* ===================================== */}

      <div className="mt-auto flex flex-col justify-end pt-5">
        {description && (
          <div className="mb-4 border-t pt-3">
            <p className="text-sm text-gray-500">
              {description}
            </p>
          </div>
        )}

        {route && buttonLabel && (
          <div className="flex justify-end">
            <Link
              to={route}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {buttonLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;