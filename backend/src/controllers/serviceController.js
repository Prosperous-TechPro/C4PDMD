/**
 * =====================================================
 * SERVICE CONTROLLER
 * =====================================================
 */

const serviceService = require("../services/serviceService");

/**
 * GET ALL SERVICES
 */
const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET SERVICE BY ID
 */
const getServiceById = async (req, res) => {
  try {
    const service = await serviceService.getServiceById(
      req.params.id
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * CREATE SERVICE
 */
const createService = async (req, res) => {
  try {
    const service = await serviceService.createService(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE SERVICE
 */
const updateService = async (req, res) => {
  try {
    const service = await serviceService.updateService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE SERVICE
 */
const deleteService = async (req, res) => {
  try {
    await serviceService.deleteService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};