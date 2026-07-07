/**
 * =====================================================
 * SETTINGS SERVICE
 * =====================================================
 * Handles Organization Settings Database Operations
 * =====================================================
 */

const { prisma } = require("../config/database");
const { normalizeSettingsPayload } = require("./settingsPayload");

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
        data: normalizeSettingsPayload({
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
          favicon: "",
          heroImage: "",
          aboutImage: "",
          heroTitle: "",
          heroSubtitle: "",
          aboutTitle: "",
          aboutText: "",
          storyTitle: "",
          storySubtitle: "",
          storyVideoOne: "",
          storyVideoTwo: "",
          storyVideoThree: "",
          mission: "",
          vision: "",
          facebook: "",
          linkedin: "",
          twitter: "",
          instagram: "",
          youtube: "",
          footerText: "",
          projectsCompleted: "250+",
          livesImpacted: "25,000+",
          communitiesReached: "50+",
          activeVolunteers: "98",
          yearsOfExperience: "15+",
        }),
      });
  }

  return normalizeSettingsPayload(settings);
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

  const normalizedData = normalizeSettingsPayload(data);

  return await prisma.setting.update({
    where: {
      id: settings.id,
    },

    data: normalizedData,
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