const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  linkFacebook: {
    type: String,
  },
  linkInstagram: {
    type: String,
  },
});

const restaurantInformation = mongoose.model(
  "Restaurant Information",
  restaurantSchema
);

module.exports = restaurantInformation;
