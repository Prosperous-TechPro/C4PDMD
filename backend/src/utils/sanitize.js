/**
 * =====================================================
 * SANITIZATION HELPERS
 * =====================================================
 */

const xss = require("xss");

const xssOptions = {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"],
};

const sanitize = (input) => {
  if (typeof input !== "string") {
    return "";
  }

  return xss(input.trim(), xssOptions);
};

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const sanitized = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitize(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "string" ? sanitize(item) : item
      );
    } else if (value && typeof value === "object") {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};

const sanitizeEmail = (email) => {
  if (typeof email !== "string") {
    return "";
  }

  return email.trim().toLowerCase();
};

const sanitizePhone = (phone) => {
  if (typeof phone !== "string") {
    return "";
  }

  return phone.replace(/[^\d\s\+\-]/g, "").trim();
};

module.exports = {
  sanitize,
  sanitizeObject,
  sanitizeEmail,
  sanitizePhone,
};