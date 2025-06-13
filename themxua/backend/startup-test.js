#!/usr/bin/env node

// Simple server startup test
console.log("🚀 Testing ThemXua Backend Server Startup...\n");

try {
  // Test environment variables
  require("dotenv").config();
  console.log("✅ Environment variables loaded");
  console.log(`   - NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`   - PORT: ${process.env.PORT}`);
  console.log(
    `   - MONGODB_URI: ${process.env.MONGODB_URI ? "Configured" : "Missing"}`
  );
  console.log(
    `   - JWT_SECRET: ${process.env.JWT_SECRET ? "Configured" : "Missing"}\n`
  );

  // Test basic Express setup
  const express = require("express");
  console.log("✅ Express imported successfully");

  // Test middleware imports
  const cors = require("cors");
  const helmet = require("helmet");
  const rateLimit = require("express-rate-limit");
  console.log("✅ Middleware packages imported successfully");

  // Test our custom middleware
  const { authMiddleware } = require("./src/middleware/auth");
  const { upload } = require("./src/middleware/upload");
  console.log("✅ Custom middleware imported successfully");

  // Test model imports
  const AdminAccount = require("./src/models/adminAccount");
  const Menu = require("./src/models/menu");
  const News = require("./src/models/news");
  const Events = require("./src/models/events");
  console.log("✅ All models imported successfully");

  // Test controller imports
  const menuController = require("./src/controllers/menuController");
  const newsController = require("./src/controllers/newsController");
  const eventsController = require("./src/controllers/eventsController");
  const bookingController = require("./src/controllers/bookingController");
  console.log("✅ All controllers imported successfully");

  // Test route imports
  const menuRoutes = require("./src/routes/admin/menu");
  const newsRoutes = require("./src/routes/admin/news");
  const eventsRoutes = require("./src/routes/admin/events");
  const bookingRoutes = require("./src/routes/admin/booking");
  console.log("✅ All admin routes imported successfully");

  console.log("\n🎉 Backend server components are ready!");
  console.log("\n📋 Next steps:");
  console.log("   1. Ensure MongoDB is running");
  console.log("   2. Run: npm run dev");
  console.log("   3. Test API endpoints");
  console.log("   4. Test frontend integration");
} catch (error) {
  console.error("❌ Error during startup test:", error.message);
  if (error.code === "MODULE_NOT_FOUND") {
    console.error("💡 Try running: npm install");
  }
}
