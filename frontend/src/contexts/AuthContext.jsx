/**
 * =====================================================
 * AUTH CONTEXT
 * =====================================================
 * Global Authentication Context
 * =====================================================
 */

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext =
  createContext(null);

const getRoleName = (userData) => userData?.role?.name || userData?.role || "User";

const canAccessDashboard = (userData) => {
  const role = getRoleName(userData);
  const status = userData?.status || "ACTIVE";
  const isVerified = !!userData?.isVerified;
  const isStaff = !!userData?.isStaff;
  const dashboardRoles = ["SUPER_ADMIN", "Admin", "Editor"];

  return dashboardRoles.includes(role) && status === "ACTIVE" && (role === "SUPER_ADMIN" || isVerified || isStaff);
};

const normalizeRoleName = (role) => String(role || "").trim().toUpperCase().replace(/\s+/g, "_");

const normalizeUser = (userData) => {
  if (!userData) return null;

  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  const role = getRoleName(userData);
  const normalizedRole = normalizeRoleName(role);
  const status = userData.status || "ACTIVE";
  const isVerified = !!userData.isVerified;
  const isStaff = !!userData.isStaff;

  return {
    ...userData,
    firstName,
    lastName,
    role,
    normalizedRole,
    status,
    isVerified,
    isStaff,
    displayName: userData.displayName || fullName || userData.email || "User",
    initials: userData.initials || `${(firstName[0] || "").toUpperCase()}${(lastName[0] || "").toUpperCase()}` || "U",
    canAccessDashboard: canAccessDashboard(userData),
  };
};

export const AuthProvider = ({ children }) => {
  /**
   * ======================================
   * STATE
   * ======================================
   */

  const [user, setUserState] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (storedUser && token) return normalizeUser(JSON.parse(storedUser));
      return null;
    } catch (e) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const setUser = (userData) => {
    const nextUser = normalizeUser(userData);
    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("user");
    }
    setUserState(nextUser);
  };

  /**
   * ======================================
   * LOGIN
   * ======================================
   */

  const login = (
    userData,
    accessToken,
    refreshToken
  ) => {
    localStorage.setItem("token", accessToken);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    setUser(userData);
  };

  /**
   * ======================================
   * LOGOUT
   * ======================================
   */

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    setUser(null);
  };

  /**
   * ======================================
   * PROVIDER
   * ======================================
   */

  const value = useMemo(() => ({
    user,
    setUser,
    loading,
    login,
    logout,
    token: localStorage.getItem("token"),
    isAuthenticated: !!user,
    canAccessDashboard: user?.canAccessDashboard || false,
  }), [user, loading]);

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * ======================================
 * HOOK
 * ======================================
 */

export const useAuth = () => {
  return useContext(
    AuthContext
  );
};