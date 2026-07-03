/**
 * =====================================================
 * AUTHENTICATION MIDDLEWARE
 * =====================================================
 * Verifies JWT Access Token
 * =====================================================
 */

const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    const accessSecret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "dev_access_secret_change_this";

    const decoded = jwt.verify(token, accessSecret);

    // attach current user record to request for up-to-date role/status
    const { prisma } = require("../config/database");
    const user = await prisma.user.findUnique({ where: { id: decoded.id }, include: { role: true } });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token user" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role?.name || null,
      status: user.status,
      isStaff: user.isStaff || false,
      isVerified: user.isVerified || false,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticate;