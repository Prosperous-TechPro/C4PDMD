/**
 * =====================================================
 * SERVER ENTRY POINT
 * =====================================================
 * Starts Express Server
 * Connects Database
 * =====================================================
 */

require("dotenv").config();

const app = require("./app");

const {
  connectDatabase,
} = require("./config/database");

const PORT = process.env.PORT || 5000;

/**
 * =====================================================
 * GLOBAL ERROR HANDLERS
 * =====================================================
 */

process.on("exit", (code) => {
  console.log(`🔴 Process exited with code: ${code}`);
});

process.on("uncaughtException", (error) => {
  console.error("❌ UNCAUGHT EXCEPTION");
  console.error(error);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ UNHANDLED REJECTION");
  console.error(error);
});

/**
 * =====================================================
 * START SERVER
 * =====================================================
 */

const startServer = async () => {
  try {
    // Connect Database
    await connectDatabase();

    // Start Express
    const server = app.listen(PORT, () => {
      console.log(`
====================================================
🚀 C4PDMD Backend Started Successfully
🌐 URL: http://localhost:${PORT}
====================================================
`);
    });

    // Server Errors
    server.on("error", (error) => {
      console.error("❌ SERVER ERROR");
      console.error(error);
    });

  } catch (error) {
    console.error("❌ SERVER STARTUP FAILED");
    console.error(error);
    process.exit(1);
  }
};

startServer();