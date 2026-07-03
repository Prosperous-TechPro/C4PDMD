/**
 * =====================================================
 * SERVICE ROUTES
 * =====================================================
 */

const express = require("express");

const router = express.Router();

const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const authorize = require("../middleware/roleMiddleware");
const authenticate = require("../middleware/authMiddleware");

router.get("/", getAllServices);

router.get("/:id", getServiceById);

router.post("/", authenticate, authorize("Admin"), createService);

router.put("/:id", authenticate, authorize("Admin"), updateService);

router.delete("/:id", authenticate, authorize("Admin"), deleteService);


module.exports = router;