/**
 * =====================================================
 * C4PDMD EXPRESS APPLICATION
 * =====================================================
 * Main Application Configuration
 * =====================================================
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

/**
 * =====================================================
 * IMPORT ROUTES
 * =====================================================
 */

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const blogRoutes = require("./routes/blogRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const donationRoutes = require("./routes/donationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const otpRoutes = require("./routes/otpRoutes");

/**
 * =====================================================
 * CREATE EXPRESS APP
 * =====================================================
 */

const app = express();

/**
 * =====================================================
 * GLOBAL MIDDLEWARE
 * =====================================================
 */

// Security Headers
app.use(helmet());

// Compression (gzip)
app.use(compression());

const configuredOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://c4-pdmd.vercel.app",
  "https://c4pdmd.onrender.com",
];
const allowedOrigins = Array.from(new Set([...configuredOrigins, ...defaultOrigins]));

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const normalizedOrigin = origin.toLowerCase();

  if (allowedOrigins.includes(normalizedOrigin)) {
    return true;
  }

  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalizedOrigin);
};

// Enable CORS for explicitly allowed origins only
app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

// Parse JSON and keep the raw payload for payment webhooks
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// Parse URL Encoded Requests
app.use(express.urlencoded({ extended: true }));

// HTTP Request Logger
app.use(morgan("dev"));

/**
 * =====================================================
 * HEALTH CHECK
 * =====================================================
 */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    organization: "C4PDMD",
    message: "Backend API Running Successfully",
    version: "1.0.0",
  });
});

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "C4PDMD API is running successfully.",
  });
});

/**
 * =====================================================
 * API ROUTES
 * =====================================================
 */

// Authentication
app.use("/api/auth", authRoutes);

const authenticate = require("./middleware/authMiddleware");

// Dashboard (protected)
app.use("/api/dashboard", authenticate, dashboardRoutes);

// Public API routes (GET endpoints are public; admin actions protected at route level)
app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);

// OTP (keep public if needed)
app.use("/api/otp", otpRoutes);

/**
 * =====================================================
 * 404 ROUTE
 * =====================================================
 */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/**
 * =====================================================
 * GLOBAL ERROR HANDLER
 * =====================================================
 */

app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.status || 500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

/**
 * =====================================================
 * EXPORT APP
 * =====================================================
 */

module.exports = app;