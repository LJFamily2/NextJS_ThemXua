const Booking = require("../models/booking");

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};

// Create new booking
const createBooking = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      email,
      date,
      time,
      numberOfPeople,
      userRequest,
    } = req.body;

    const newBooking = new Booking({
      name,
      phoneNumber,
      email,
      date,
      time,
      numberOfPeople,
      userRequest,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating booking", error: error.message });
  }
};

// Update booking
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating booking", error: error.message });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status, note },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating booking status", error: error.message });
  }
};

// Bulk operations for booking management
const bulkUpdateBookingStatus = async (req, res) => {
  try {
    const { action } = req.body; // 'accept' or 'reject'

    let status;
    if (action === "accept") {
      status = "accepted";
    } else if (action === "reject") {
      status = "rejected";
    } else {
      return res
        .status(400)
        .json({ message: 'Invalid action. Use "accept" or "reject"' });
    }

    const result = await Booking.updateMany({ status: "pending" }, { status });

    res.json({
      message: `Successfully ${action}ed ${result.modifiedCount} bookings`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating booking statuses",
        error: error.message,
      });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
  bulkUpdateBookingStatus,
};
