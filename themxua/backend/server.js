const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
app.use("/uploads", express.static("uploads"));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/restaurant", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/bookings", require("./src/routes/bookings"));
app.use("/api/menu", require("./src/routes/menu"));
app.use("/api/news", require("./src/routes/news"));
app.use("/api/events", require("./src/routes/events"));
app.use("/api/admin/auth", require("./src/routes/admin/auth"));
app.use("/api/admin/booking", require("./src/routes/admin/booking"));
app.use(
  "/api/admin/booking/history",
  require("./src/routes/admin/booking-history")
);
app.use(
  "/api/admin/booking/accepted",
  require("./src/routes/admin/booking-accepted")
);
app.use("/api/admin/welcome", require("./src/routes/admin/welcome"));
app.use("/api/admin/spotlight", require("./src/routes/admin/spotlight"));
app.use("/api/admin/hero", require("./src/routes/admin/hero"));
app.use(
  "/api/admin/restaurant-info",
  require("./src/routes/admin/restaurant-info")
);
app.use("/api/admin/events", require("./src/routes/admin/events"));
app.use("/api/admin/menu", require("./src/routes/admin/menu"));
app.use("/api/admin/users", require("./src/routes/admin/users"));
app.use("/api/admin/profile", require("./src/routes/admin/profile"));
app.use("/api/admin/news", require("./src/routes/admin/news"));
app.use("/api/admin/seo", require("./src/routes/admin/seo"));
app.use("/api/sitemap", require("./src/routes/sitemap"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
