/**
 * =====================================================
 * PROTECTED ROUTE
 * =====================================================
 * Protects authenticated routes.
 * =====================================================
 */

import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({
  children,
}) => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  /**
   * ======================================
   * AUTH LOADING
   * ======================================
   */

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">

            Checking authentication...

          </p>

        </div>

      </div>
    );
  }

  /**
   * ======================================
   * NOT AUTHENTICATED
   * ======================================
   */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /**
   * ======================================
   * AUTHENTICATED
   * ======================================
   */

  return children;
};

export default ProtectedRoute;