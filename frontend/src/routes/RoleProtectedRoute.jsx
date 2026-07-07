/**
 * =====================================================
 * ROLE PROTECTED ROUTE
 * =====================================================
 * Restricts access based on user roles.
 * =====================================================
 */

import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const normalizeRoleName = (role) => String(role || "").trim().toUpperCase().replace(/\s+/g, "_");

const RoleProtectedRoute = ({
  children,
  roles = [],
  role,
}) => {
  const {
    user,
    isAuthenticated,
    loading,
  } = useAuth();

  const allowedRoles = [
    ...new Set([
      ...(Array.isArray(roles)
        ? roles
        : roles
        ? [roles]
        : []),
      ...(Array.isArray(role)
        ? role
        : role
        ? [role]
        : []),
    ]),
  ].map(normalizeRoleName);
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">

            Checking permissions...

          </p>

        </div>

      </div>
    );
  }

  /**
   * ======================================
   * NOT LOGGED IN
   * ======================================
   */

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /**
   * ======================================
   * UNAUTHORIZED
   * ======================================
   */

  // Check account status
  if (user.status && user.status === "PENDING") {
    return <Navigate to="/verify-account" replace />;
  }

  if (user.status && ["SUSPENDED", "REJECTED", "INACTIVE"].includes(user.status)) {
    return <Navigate to="/" replace />;
  }

  const normalizedUserRole = normalizeRoleName(user?.role);

  if (allowedRoles.length > 0 && !allowedRoles.includes(normalizedUserRole)) {
    return <Navigate to="/" replace />;
  }

  /**
   * ======================================
   * AUTHORIZED
   * ======================================
   */

  return children;
};

export default RoleProtectedRoute;