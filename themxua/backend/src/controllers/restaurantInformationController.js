const fs = require("fs").promises;
const path = require("path");
const RestaurantInformation = require("../models/restaurantInformation");

const deleteImageFile = async (imagePath) => {
  try {
    await fs.unlink(imagePath);
  } catch (err) {
    console.log("Error deleting image file:", err);
  }
};

const restaurantInformationController = {
  // Get all restaurant information
  getAllInformation: async (req, res) => {
    try {
      const information = await RestaurantInformation.find({});
      res.status(200).json({
        success: true,
        data: information,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching restaurant information",
        error: error.message,
      });
    }
  },

  // Add new restaurant information
  addInformation: async (req, res) => {
    try {
      let informationData = { ...req.body };

      if (req.file) {
        informationData.logo = req.file.filename;
      }

      const information = await RestaurantInformation.create(informationData);

      res.status(201).json({
        success: true,
        message: "Restaurant information created successfully",
        data: information,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error creating restaurant information",
        error: error.message,
      });
    }
  },

  // Delete restaurant information
  deleteInformation: async (req, res) => {
    try {
      const information = await RestaurantInformation.findByIdAndDelete(
        req.params.id
      );

      if (!information) {
        return res.status(404).json({
          success: false,
          message: "Restaurant information not found",
        });
      }

      // Delete logo file if exists
      if (information.logo) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", information.logo)
        );
      }

      res.status(200).json({
        success: true,
        message: "Restaurant information deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error deleting restaurant information",
        error: error.message,
      });
    }
  },

  // Update restaurant information
  updateInformation: async (req, res) => {
    try {
      const information = await RestaurantInformation.findById(req.params.id);
      if (!information) {
        return res.status(404).json({
          success: false,
          message: "Restaurant information not found",
        });
      }

      const updatedFields = {
        phone: req.body.newPhone?.trim() || req.body.phone?.trim(),
        title: req.body.newTitle?.trim() || req.body.title?.trim(),
        linkFacebook:
          req.body.newLinkFacebook?.trim() || req.body.linkFacebook?.trim(),
        linkInstagram:
          req.body.newLinkInstagram?.trim() || req.body.linkInstagram?.trim(),
      };

      // Remove undefined fields
      Object.keys(updatedFields).forEach((key) => {
        if (updatedFields[key] === undefined) {
          delete updatedFields[key];
        }
      });

      if (req.file) {
        if (information.logo) {
          await deleteImageFile(
            path.join(__dirname, "../../uploads", information.logo)
          );
        }
        updatedFields.logo = req.file.filename;
      }

      const updatedInformation = await RestaurantInformation.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Restaurant information updated successfully",
        data: updatedInformation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error updating restaurant information",
        error: error.message,
      });
    }
  },
};

module.exports = restaurantInformationController;
