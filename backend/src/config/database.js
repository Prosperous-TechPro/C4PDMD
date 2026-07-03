/**
 * =====================================================
 * DATABASE CONFIGURATION
 * =====================================================
 * Handles PostgreSQL connection using Prisma ORM
 * =====================================================
 */

const { PrismaClient } = require("@prisma/client");

// Create Prisma Client Instance
const prisma = new PrismaClient();

/**
 * Connect Database
 */
const connectDatabase = async () => {
  try {
    await prisma.$connect();

    console.log("✅ PostgreSQL Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);

    process.exit(1);
  }
};

module.exports = {
  prisma,
  connectDatabase,
};