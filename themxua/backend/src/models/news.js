const mongoose = require("mongoose");
const slugify = require("slugify");

const newsSchema = new mongoose.Schema({
  title: String,
  picture: String,
  details: [
    {
      heading: String,
      description: String,
      image: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

newsSchema.methods.getFormattedDateTime = function () {
  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

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

newsSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const News = mongoose.model("News", newsSchema);

module.exports = { News };
