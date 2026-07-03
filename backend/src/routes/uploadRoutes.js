/**
 * =====================================================
 * FILE UPLOAD ROUTES
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/upload");

const {
  uploadImage
} = require("../controllers/uploadController");

/**
 * Upload Single Image
 */

router.post(
  "/image",
  upload.single("image"),
  uploadImage
);

module.exports = router;