const fs = require("fs").promises;
const path = require("path");
const Picture = require("../models/spotLight");

const deleteImageFile = async (imagePath) => {
  try {
    await fs.unlink(imagePath);
  } catch (err) {
    console.log("Error deleting image file:", err);
  }
};

const spotlightController = {
  // Get all spotlight images
  getAllSpotlights: async (req, res) => {
    try {
      const spotlights = await Picture.find({});
      res.status(200).json({
        success: true,
        data: spotlights,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching spotlight data",
        error: error.message,
      });
    }
  },

  // Add new spotlight image
  addImages: async (req, res) => {
    try {
      const { title } = req.body;
      let spotlightData = { title };

      if (req.files["picture"]) {
        spotlightData.picture = req.files["picture"][0].filename;
      }

      if (req.files["pictureMobile"]) {
        spotlightData.pictureMobile = req.files["pictureMobile"][0].filename;
      }

      const spotlight = await Picture.create(spotlightData);

      res.status(201).json({
        success: true,
        message: "Spotlight created successfully",
        data: spotlight,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error creating spotlight",
        error: error.message,
      });
    }
  },

  // Delete single spotlight image
  deleteImage: async (req, res) => {
    try {
      const picture = await Picture.findByIdAndDelete(req.params.id);
      if (!picture) {
        return res.status(404).json({
          success: false,
          message: "Spotlight image not found",
        });
      }

      // Delete image files
      if (picture.picture) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", picture.picture)
        );
      }

      if (picture.pictureMobile) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", picture.pictureMobile)
        );
      }

      res.status(200).json({
        success: true,
        message: "Spotlight image deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error deleting spotlight image",
        error: error.message,
      });
    }
  },

  // Delete all spotlight images
  deleteAllImages: async (req, res) => {
    try {
      const pictures = await Picture.find({});

      const deleteImage = async (picture) => {
        await Picture.findByIdAndDelete(picture._id);

        if (picture.picture) {
          await deleteImageFile(
            path.join(__dirname, "../../uploads", picture.picture)
          );
        }
        if (picture.pictureMobile) {
          await deleteImageFile(
            path.join(__dirname, "../../uploads", picture.pictureMobile)
          );
        }
      };

      for (const picture of pictures) {
        await deleteImage(picture);
      }

      res.status(200).json({
        success: true,
        message: "All spotlight images deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error deleting all spotlight images",
        error: error.message,
      });
    }
  },

  // Update spotlight image
  updateImage: async (req, res) => {
    try {
      const picture = await Picture.findById(req.params.id);
      if (!picture) {
        return res.status(404).json({
          success: false,
          message: "Spotlight image not found",
        });
      }

      // Update the picture's title
      const updatedFields = { title: req.body.newTitle || picture.title };

      const updateImagePath = async (fileType, field) => {
        if (req.files[fileType] && req.files[fileType].length > 0) {
          if (picture[field]) {
            await deleteImageFile(
              path.join(__dirname, "../../uploads", picture[field])
            );
          }
          updatedFields[field] = req.files[fileType][0].filename;
        }
      };

      await updateImagePath("newPicture", "picture");
      await updateImagePath("newPictureMobile", "pictureMobile");

      // Update the picture document in the database
      const updatedPicture = await Picture.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Spotlight image updated successfully",
        data: updatedPicture,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error updating spotlight image",
        error: error.message,
      });
    }
  },
};

module.exports = spotlightController;
