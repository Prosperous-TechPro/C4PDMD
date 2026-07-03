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

      {description && (
        <div className="mt-5 border-t pt-3">

          <p className="text-sm text-gray-500">
            {description}
          </p>

        </div>
      )}

    </div>
  );
};

export default StatsCard;