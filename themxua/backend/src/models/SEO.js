const mongoose = require("mongoose");

const SEOSchema = new mongoose.Schema(
  {
    mainPage: {
      type: String,
      required: true,
    },
    eventPage: {
      type: String,
      required: true,
    },
    newsPage: {
      type: String,
      required: true,
    },
    menuPage: {
      type: String,
      required: true,
    },
    bookingPage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SEO = mongoose.model("SEO for pages", SEOSchema);

module.exports = SEO;
