/**
 * =====================================================
 * USER SERVICE
 * =====================================================
 * Handles all User database operations.
 *
 * Author : Prosperous TechPro
 * Project: C4PDMD Management System
 * =====================================================
 */

const bcrypt = require("bcryptjs");
const { prisma } = require("../config/database");

const formatUserId = (id) => `C4PDMD-${String(id).padStart(4, "0")}`;

const buildDisplayName = (user) => {
  const fullName = [user?.firstName?.trim(), user?.lastName?.trim()]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || user?.email || "User";
};

const getInitials = (user) => {
  const firstInitial = user?.firstName?.trim()?.[0] || "";
  const lastInitial = user?.lastName?.trim()?.[0] || "";
  const initials = `${firstInitial}${lastInitial}`.toUpperCase();

  return initials || "U";
};

const mapUser = (user) => ({
  ...(() => {
    const { password, ...safeUser } = user;
    return safeUser;
  })(),
  systemId: formatUserId(user.id),
  displayName: buildDisplayName(user),
  initials: getInitials(user),
});

/**
 * =====================================================
 * GET ALL USERS
 * =====================================================
 */
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users.map(mapUser);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * GET USER BY ID
 * =====================================================
 */
const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        role: true,
      },
    });

    return user ? mapUser(user) : null;
  } catch (error) {
    console.error("GET USER ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * CREATE USER
 * =====================================================
 */
const createUser = async (userData) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (existingUser) {
      throw new Error("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      10
    );

    const role = await prisma.role.findUnique({
      where: {
        id: Number(userData.roleId),
      },
    });

    const roleName = role?.name;
    const staffRoles = ["SUPER_ADMIN", "Admin", "Editor"];
    const isStaffRole = roleName ? staffRoles.includes(roleName) : false;
    const isStaff = userData.isStaff !== undefined ? Boolean(userData.isStaff) : isStaffRole;
    const isVerified = userData.isVerified !== undefined ? Boolean(userData.isVerified) : isStaffRole;

    const user = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        roleId: Number(userData.roleId),
        status: userData.status || "ACTIVE",
        isStaff,
        isVerified,
        profileImageUrl: userData.profileImageUrl || null,
        coverImageUrl: userData.coverImageUrl || null,
      },
      include: {
        role: true,
      },
    });

    return mapUser(user);
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE USER
 * =====================================================
 */
const updateUser = async (id, userData) => {
  try {
    const data = {};

    if (userData.firstName !== undefined) data.firstName = userData.firstName;
    if (userData.lastName !== undefined) data.lastName = userData.lastName;
    if (userData.email !== undefined) data.email = userData.email;
    if (userData.phoneNumber !== undefined) data.phoneNumber = userData.phoneNumber || null;
    if (userData.roleId !== undefined && userData.roleId !== "") data.roleId = Number(userData.roleId);
    if (userData.status !== undefined) data.status = userData.status;
    if (userData.profileImageUrl !== undefined) data.profileImageUrl = userData.profileImageUrl || null;
    if (userData.coverImageUrl !== undefined) data.coverImageUrl = userData.coverImageUrl || null;

    if (
      userData.password &&
      userData.password.trim() !== ""
    ) {
      data.password = await bcrypt.hash(
        userData.password,
        10
      );
    }

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
      include: {
        role: true,
      },
    });

    return mapUser(user);
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * UPDATE CURRENT USER PROFILE
 * =====================================================
 */
const updateCurrentUserProfile = async (id, userData) => {
  try {
    const data = {};

    if (userData.firstName !== undefined) data.firstName = userData.firstName;
    if (userData.lastName !== undefined) data.lastName = userData.lastName;
    if (userData.email !== undefined) data.email = userData.email;
    if (userData.phoneNumber !== undefined) data.phoneNumber = userData.phoneNumber || null;
    if (userData.profileImageUrl !== undefined) data.profileImageUrl = userData.profileImageUrl || null;
    if (userData.coverImageUrl !== undefined) data.coverImageUrl = userData.coverImageUrl || null;

    if (userData.password && userData.password.trim() !== "") {
      data.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data,
      include: { role: true },
    });

    return mapUser(user);
  } catch (error) {
    console.error("UPDATE CURRENT USER ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * DELETE USER
 * =====================================================
 */
const deleteUser = async (id) => {
  try {
    return await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * GET ALL ROLES
 * =====================================================
 */
const getRoles = async () => {
  try {
    return await prisma.role.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("GET ROLES ERROR:", error);
    throw error;
  }
};

/**
 * Approve a pending staff/user account
 */
const approveUser = async (id, approverId) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { status: "ACTIVE", approvedBy: approverId ? Number(approverId) : null, approvedAt: new Date(), isVerified: true },
      include: { role: true },
    });

    return mapUser(user);
  } catch (error) {
    console.error("APPROVE USER ERROR:", error);
    throw error;
  }
};

const changeUserRole = async (id, roleId) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { roleId: Number(roleId) },
      include: { role: true },
    });

    return mapUser(user);
  } catch (error) {
    console.error("CHANGE USER ROLE ERROR:", error);
    throw error;
  }
};

const changeUserStatus = async (id, status) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { status },
      include: { role: true },
    });

    return mapUser(user);
  } catch (error) {
    console.error("CHANGE USER STATUS ERROR:", error);
    throw error;
  }
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateCurrentUserProfile,
  deleteUser,
  getRoles,
  approveUser,
  changeUserRole,
  changeUserStatus,
};