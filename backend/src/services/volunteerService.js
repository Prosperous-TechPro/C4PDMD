/**
 * =====================================================
 * VOLUNTEER SERVICE
 * =====================================================
 * Handles all Volunteer database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET ALL VOLUNTEERS
 * =====================================================
 */

const getAllVolunteers = async () => {
  try {
    return await prisma.volunteer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error(
      "GET VOLUNTEERS ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * GET VOLUNTEER BY ID
 * =====================================================
 */

const getVolunteerById = async (id) => {
  try {
    return await prisma.volunteer.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "GET VOLUNTEER ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * CREATE VOLUNTEER
 * =====================================================
 */

const createVolunteer = async (data) => {
  try {
    return await prisma.volunteer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        skills: data.skills,
        resume: data.resume || null,
        status: data.status || "PENDING",
      },
    });
  } catch (error) {
    console.error(
      "CREATE VOLUNTEER ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE VOLUNTEER
 * =====================================================
 */

const updateVolunteer = async (
  id,
  data
) => {
  try {
    return await prisma.volunteer.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        skills: data.skills,
        resume: data.resume || null,
        status: data.status,
      },
    });
  } catch (error) {
    console.error(
      "UPDATE VOLUNTEER ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * DELETE VOLUNTEER
 * =====================================================
 */

const deleteVolunteer = async (id) => {
  try {
    return await prisma.volunteer.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error(
      "DELETE VOLUNTEER ERROR:",
      error
    );
    throw error;
  }
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
};