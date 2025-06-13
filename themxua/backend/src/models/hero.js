const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const heroArea = mongoose.model("Hero Area", heroSchema);

module.exports = heroArea;
