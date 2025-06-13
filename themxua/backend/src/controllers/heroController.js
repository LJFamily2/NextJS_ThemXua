const fs = require("fs").promises;
const path = require("path");
const Hero = require("../models/hero");

const heroController = {
  // Get all hero items
  getAllHeros: async (req, res) => {
    try {
      const heroes = await Hero.find({});
      res.status(200).json({
        success: true,
        data: heroes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching hero data",
        error: error.message,
      });
    }
  },

  // Add new hero
  addHero: async (req, res) => {
    try {
      let heroData = { ...req.body };

      if (req.files["image"]) {
        heroData.image = req.files["image"][0].filename;
      }

      if (req.files["imageMobile"]) {
        heroData.imageMobile = req.files["imageMobile"][0].filename;
      }

      const hero = await Hero.create(heroData);

      res.status(201).json({
        success: true,
        message: "Hero created successfully",
        data: hero,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error creating hero",
        error: error.message,
      });
    }
  },

  // Delete hero
  deleteHero: async (req, res) => {
    try {
      const hero = await Hero.findByIdAndDelete(req.params.id);
      if (!hero) {
        return res.status(404).json({
          success: false,
          message: "Hero not found",
        });
      }

      // Delete image files
      const deleteImageFile = async (imagePath) => {
        try {
          await fs.unlink(path.join(__dirname, "../../uploads", imagePath));
        } catch (err) {
          console.log("Error deleting image file:", err);
        }
      };

      if (hero.image) {
        await deleteImageFile(hero.image);
      }
      if (hero.imageMobile) {
        await deleteImageFile(hero.imageMobile);
      }

      res.status(200).json({
        success: true,
        message: "Hero deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error deleting hero",
        error: error.message,
      });
    }
  },

  // Update hero
  updateHero: async (req, res) => {
    try {
      const hero = await Hero.findById(req.params.id);
      if (!hero) {
        return res.status(404).json({
          success: false,
          message: "Hero not found",
        });
      }

      // Update text fields
      Object.keys(req.body).forEach((key) => {
        hero[key] = req.body[key];
      });

      // Update image files
      const updateImageFile = async (fileType, heroField) => {
        if (req.files[fileType] && req.files[fileType].length > 0) {
          // Delete old image if exists
          if (hero[heroField]) {
            const oldImageFilePath = path.join(
              __dirname,
              "../../uploads",
              hero[heroField]
            );

            try {
              await fs.unlink(oldImageFilePath);
            } catch (err) {
              console.log(`Error deleting old ${fileType} file:`, err);
            }
          }
          hero[heroField] = req.files[fileType][0].filename;
        }
      };

      await updateImageFile("newImage", "image");
      await updateImageFile("newImageMobile", "imageMobile");

      // Save the updated hero
      await hero.save();

      res.status(200).json({
        success: true,
        message: "Hero updated successfully",
        data: hero,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error updating hero",
        error: error.message,
      });
    }
  },
};

module.exports = heroController;
