const mongoose = require("mongoose");

const menusSchema = new mongoose.Schema({
  description: {
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
  URL: {
    type: String,
    required: true,
  },
  URLMobile: {
    type: String,
  },
});

const menuArea = mongoose.model("Menu Area", menusSchema);

module.exports = menuArea;
