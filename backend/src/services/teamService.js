/**
 * =====================================================
 * TEAM SERVICE
 * =====================================================
 * Handles Team Member Database Operations
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * Get All Team Members
 */
const getAllTeamMembers = async () => {
  return await prisma.teamMember.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Get Team Member By ID
 */
const getTeamMemberById = async (id) => {
  return await prisma.teamMember.findUnique({
    where: {
      id: Number(id),
    },
  });
};

/**
 * Create Team Member
 */
const createTeamMember = async (data) => {
  return await prisma.teamMember.create({
    data: {
      name: data.name,
      position: data.position,
      biography: data.biography,
      image: data.image || null,
    },
  });
};

/**
 * Update Team Member
 */
const updateTeamMember = async (id, data) => {
  return await prisma.teamMember.update({
    where: {
      id: Number(id),
    },
    data: {
      name: data.name,
      position: data.position,
      biography: data.biography,
      image: data.image,
    },
  });
};

/**
 * Delete Team Member
 */
const deleteTeamMember = async (id) => {
  return await prisma.teamMember.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};