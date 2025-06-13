const mongoose = require("mongoose");
const slugify = require("slugify");

const eventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hook: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageMobile: {
    type: String,
  },
  published: {
    type: Boolean,
    default: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

eventsSchema.methods.getFormattedDateTime = function () {
  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

  // Check if createdAt field is defined
  if (this.createdAt) {
    const formattedDate = this.createdAt.toLocaleDateString(
      "en-GB",
      dateOptions
    );
    return `${formattedDate}`;
  } else {
    return "";
  }
};

eventsSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

eventsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const events = mongoose.model("Events", eventsSchema);

module.exports = events;
