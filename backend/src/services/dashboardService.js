/**
 * =====================================================
 * DASHBOARD SERVICE
 * =====================================================
 * Handles all dashboard-related database operations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

const { prisma } = require("../config/database");

/**
 * =====================================================
 * GET DASHBOARD STATISTICS
 * =====================================================
 */

const getDashboardStatistics = async () => {
  try {
    const [
      totalUsers,
      totalTeamMembers,
      totalProjects,
      totalServices,
      totalBlogPosts,
      totalGalleryImages,
      totalPartners,
      totalTestimonials,
      totalMessages,
      totalVolunteers,
      totalDonations,
      donationAggregate,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.teamMember.count(),
      prisma.project.count(),
      prisma.service.count(),
      prisma.blogPost.count(),
      prisma.gallery.count(),
      prisma.partner.count(),
      prisma.testimonial.count(),
      prisma.contactMessage.count(),
      prisma.volunteer.count(),
      prisma.donation.count(),
      prisma.donation.aggregate({
        _sum: {
          amount: true,
        },
      }),
    ]);

    return {
      overview: {
        totalUsers,
        totalTeamMembers,
        totalProjects,
        totalServices,
        totalBlogPosts,
        totalGalleryImages,
        totalPartners,
        totalTestimonials,
        totalMessages,
        totalVolunteers,
        totalDonations,
        totalDonationAmount:
          Number(
            donationAggregate._sum.amount || 0
          ),
      },
    };
  } catch (error) {
    console.error(
      "DASHBOARD STATISTICS ERROR:",
      error
    );

    throw error;
  }
};

/**
 * =====================================================
 * GET DASHBOARD CHART DATA
 * =====================================================
 */

const getDashboardCharts = async () => {
  try {
    const { overview } =
      await getDashboardStatistics();

    return [
      {
        name: "Users",
        total: overview.totalUsers,
      },
      {
        name: "Team",
        total:
          overview.totalTeamMembers,
      },
      {
        name: "Projects",
        total:
          overview.totalProjects,
      },
      {
        name: "Services",
        total:
          overview.totalServices,
      },
      {
        name: "Blogs",
        total:
          overview.totalBlogPosts,
      },
      {
        name: "Gallery",
        total:
          overview.totalGalleryImages,
      },
      {
        name: "Partners",
        total:
          overview.totalPartners,
      },
      {
        name: "Testimonials",
        total:
          overview.totalTestimonials,
      },
      {
        name: "Volunteers",
        total:
          overview.totalVolunteers,
      },
      {
        name: "Messages",
        total:
          overview.totalMessages,
      },
      {
        name: "Donations",
        total:
          overview.totalDonations,
      },
    ];
  } catch (error) {
    console.error(
      "DASHBOARD CHART ERROR:",
      error
    );

    throw error;
  }
};

/**
 * =====================================================
 * GET RECENT ACTIVITIES
 * =====================================================
 */

const getRecentActivities =
  async () => {
    try {
      const [
        projects,
        blogs,
        volunteers,
        contacts,
        donations,
      ] = await Promise.all([
        prisma.project.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.blogPost.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.volunteer.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.contactMessage.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.donation.findMany({
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

      const activities = [
        ...projects.map(
          (item) => ({
            type: "Project",
            title: item.title,
            createdAt:
              item.createdAt,
          })
        ),

        ...blogs.map(
          (item) => ({
            type: "Blog",
            title: item.title,
            createdAt:
              item.createdAt,
          })
        ),

        ...volunteers.map(
          (item) => ({
            type: "Volunteer",
            title: item.name,
            createdAt:
              item.createdAt,
          })
        ),

        ...contacts.map(
          (item) => ({
            type: "Contact",
            title: item.subject,
            createdAt:
              item.createdAt,
          })
        ),

        ...donations.map(
          (item) => ({
            type: "Donation",
            title:
              item.donorName,
            createdAt:
              item.createdAt,
          })
        ),
      ];

      return activities.sort(
        (a, b) =>
          new Date(
            b.createdAt
          ) -
          new Date(a.createdAt)
      );
    } catch (error) {
      console.error(
        "RECENT ACTIVITIES ERROR:",
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
  getDashboardStatistics,
  getDashboardCharts,
  getRecentActivities,
};