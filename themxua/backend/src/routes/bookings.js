const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
} = require("../controllers/bookingController");

// Public route - create booking
router.post("/", createBooking);

// Public route - get booking by ID (for confirmation)
router.get("/:id", getBookingById);

module.exports = router;
