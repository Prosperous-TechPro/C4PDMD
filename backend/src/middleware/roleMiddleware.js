/**
 * =====================================================
 * ROLE AUTHORIZATION MIDDLEWARE
 * =====================================================
 * Restricts Access Based on User Role
 * =====================================================
 */

const normalizeRoleName = (role) => String(role || "").trim().toUpperCase().replace(/\s+/g, "_");

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Check account status
    if (req.user.status && req.user.status !== "ACTIVE") {
      return res.status(403).json({ success: false, message: "Account is not active" });
    }

    // Check verification for staff accounts
    if (req.user.isStaff && !req.user.isVerified) {
      return res.status(403).json({ success: false, message: "Account verification required" });
    }

    const userRole = normalizeRoleName(req.user.role);
    const allowedRoles = roles.map(normalizeRoleName);
    const hasSuperAdminAccess = userRole === "SUPER_ADMIN";

    if (roles && roles.length > 0 && !hasSuperAdminAccess && !allowedRoles.includes(userRole)) {
      return res.status(403).json({ success: false, message: "Permission denied" });
    }

    next();
  };
};

module.exports = authorize;