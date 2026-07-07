/**
 * =====================================================
 * SETTINGS SERVICE
 * =====================================================
 * Handles Organization Settings Database Operations
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET SETTINGS
 * =====================================================
 * Returns the single settings record.
 * If none exists, create a default one.
 * =====================================================
 */

const getSettings = async () => {
  let settings =
    await prisma.setting.findFirst();

  if (!settings) {
    settings =
      await prisma.setting.create({
        data: {
          organizationName:
            "Center for Prim-Data Measurement and Development",
          shortName: "C4PDMD",
          email:
            "c4pdmd@gmail.com",
          phone:
            "+233 242 406 733",
          address:
            "Ho, Volta Region, Ghana",
          website: "",
          logo: "",
        },
      });
  }

  return settings;
};

/**
 * =====================================================
 * UPDATE SETTINGS
 * =====================================================
 */

const updateSettings = async (
  data
) => {
  let settings =
    await prisma.setting.findFirst();

  if (!settings) {
    settings =
      await prisma.setting.create({
        data: {},
      });
  }

  return await prisma.setting.update({
    where: {
      id: settings.id,
    },

    data: {
      organizationName:
        data.organizationName,
      shortName:
        data.shortName,
      email: data.email,
      phone: data.phone,
      address:
        data.address,
      website:
        data.website,
      logo: data.logo,
    },
  });
};

/**
 * =====================================================
 * EXPORTS
 * =====================================================
 */

module.exports = {
  getSettings,
  updateSettings,
};