/**
 * =====================================================
 * MULTER + CLOUDINARY STORAGE
 * =====================================================
 */

const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "c4pdmd",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg", "mp4", "mov", "avi", "mkv", "webm", "ogg"],
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/") && !file.mimetype.startsWith("video/")) {
    return cb(new Error("Only image and video files are allowed."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;