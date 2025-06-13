const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Chưa duyệt",
  },
  userRequest: {
    type: String,
  },
  numberOfPeople: {
    type: String,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

bookingSchema.methods.getFormattedDateTime = function () {
  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  // Check if createdAt field is defined
  if (this.createdAt) {
    const formattedDate = this.createdAt.toLocaleDateString(
      "en-GB",
      dateOptions
    );
    const formattedTime = this.createdAt.toLocaleTimeString(
      "en-US",
      timeOptions
    );
    return `${formattedDate}\n ${formattedTime}`;
  } else {
    return "";
  }
};

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
