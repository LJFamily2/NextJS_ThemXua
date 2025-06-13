const mongoose = require("mongoose");

const spotlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  pictureMobile: {
    type: String,
    required: true,
  },
});

const spotlightPicture = mongoose.model("Spotlight", spotlightSchema);

module.exports = spotlightPicture;
