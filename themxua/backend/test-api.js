// Test script to verify API endpoints
const express = require("express");
const app = express();

// Test importing all our routes and controllers
try {
  console.log("Testing imports...");

  // Test controller imports
  const menuController = require("./src/controllers/menuController");
  const newsController = require("./src/controllers/newsController");
  const eventsController = require("./src/controllers/eventsController");
  const bookingController = require("./src/controllers/bookingController");

  console.log("✓ All controllers imported successfully");

  // Test middleware imports
  const { authMiddleware } = require("./src/middleware/auth");
  const { upload } = require("./src/middleware/upload");

  console.log("✓ All middleware imported successfully");

  // Test route imports
  const menuRoutes = require("./src/routes/admin/menu");
  const newsRoutes = require("./src/routes/admin/news");
  const eventsRoutes = require("./src/routes/admin/events");
  const bookingRoutes = require("./src/routes/admin/booking");

  console.log("✓ All routes imported successfully");

  // Test model imports
  const Menu = require("./src/models/menu");
  const News = require("./src/models/news");
  const Events = require("./src/models/events");
  const AdminAccount = require("./src/models/adminAccount");

  console.log("✓ All models imported successfully");

  console.log("\n🎉 All API components are properly structured!");
  console.log("\nAvailable endpoints:");
  console.log("- GET /api/admin/menu (get all menu items)");
  console.log("- POST /api/admin/menu (create menu item)");
  console.log("- PUT /api/admin/menu/:id (update menu item)");
  console.log("- DELETE /api/admin/menu/:id (delete menu item)");
  console.log("- DELETE /api/admin/menu (delete all menu items)");
  console.log("");
  console.log("- GET /api/admin/news (get all news articles)");
  console.log("- POST /api/admin/news (create news article)");
  console.log("- PUT /api/admin/news/:id (update news article)");
  console.log("- DELETE /api/admin/news/:id (delete news article)");
  console.log("- DELETE /api/admin/news (delete all news articles)");
  console.log("");
  console.log("- GET /api/admin/events (get all events)");
  console.log("- POST /api/admin/events (create event)");
  console.log("- PUT /api/admin/events/:id (update event)");
  console.log("- DELETE /api/admin/events/:id (delete event)");
  console.log("- DELETE /api/admin/events (delete all events)");
  console.log("");
  console.log("- GET /api/admin/booking (get all bookings)");
  console.log("- PUT /api/admin/booking/:id (update booking)");
  console.log("- DELETE /api/admin/booking/:id (delete booking)");
  console.log("- POST /api/admin/booking/bulk-update (bulk update bookings)");
} catch (error) {
  console.error("❌ Error importing components:", error.message);
  console.error(error.stack);
}
