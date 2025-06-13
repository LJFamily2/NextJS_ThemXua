const SEO = require("../models/SEO");

const seoController = {
  // Get all SEO settings
  getAllSEO: async (req, res) => {
    try {
      const seoSettings = await SEO.find({});
      res.status(200).json(seoSettings);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching SEO settings",
        error: error.message,
      });
    }
  },

  // Get SEO settings by ID
  getSEOById: async (req, res) => {
    try {
      const seoSetting = await SEO.findById(req.params.id);
      if (!seoSetting) {
        return res.status(404).json({
          success: false,
          message: "SEO settings not found",
        });
      }
      res.status(200).json({
        success: true,
        data: seoSetting,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching SEO settings",
        error: error.message,
      });
    }
  },

  // Create new SEO settings
  createSEO: async (req, res) => {
    try {
      const { mainPage, eventPage, menuPage, bookingPage, newsPage } = req.body;

      const seoData = {
        mainPage: mainPage?.trim(),
        eventPage: eventPage?.trim(),
        menuPage: menuPage?.trim(),
        bookingPage: bookingPage?.trim(),
        newsPage: newsPage?.trim(),
      };

      const newSEO = await SEO.create(seoData);

      res.status(201).json({
        success: true,
        message: "SEO settings created successfully",
        data: newSEO,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error creating SEO settings",
        error: error.message,
      });
    }
  },

  // Update SEO settings
  updateSEO: async (req, res) => {
    try {
      const { mainPage, eventPage, menuPage, bookingPage, newsPage } = req.body;

      const updateFields = {
        mainPage: mainPage?.trim(),
        eventPage: eventPage?.trim(),
        menuPage: menuPage?.trim(),
        bookingPage: bookingPage?.trim(),
        newsPage: newsPage?.trim(),
      };

      // Remove undefined fields
      Object.keys(updateFields).forEach((key) => {
        if (updateFields[key] === undefined) {
          delete updateFields[key];
        }
      });

      const updatedSEO = await SEO.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true }
      );

      if (!updatedSEO) {
        return res.status(404).json({
          success: false,
          message: "SEO settings not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "SEO settings updated successfully",
        data: updatedSEO,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error updating SEO settings",
        error: error.message,
      });
    }
  },

  // Create or update SEO settings (upsert operation)
  upsertSEO: async (req, res) => {
    try {
      const { mainPage, eventPage, menuPage, bookingPage, newsPage } = req.body;

      const updateFields = {
        mainPage: mainPage?.trim(),
        eventPage: eventPage?.trim(),
        menuPage: menuPage?.trim(),
        bookingPage: bookingPage?.trim(),
        newsPage: newsPage?.trim(),
      };

      // Check if SEO settings already exist
      const existingSEO = await SEO.findOne({});

      let result;
      if (existingSEO) {
        // Update existing SEO settings
        result = await SEO.findByIdAndUpdate(existingSEO._id, updateFields, {
          new: true,
        });
      } else {
        // Create new SEO settings
        result = await SEO.create(updateFields);
      }

      res.status(200).json({
        success: true,
        message: existingSEO
          ? "SEO settings updated successfully"
          : "SEO settings created successfully",
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error saving SEO settings",
        error: error.message,
      });
    }
  },

  // Delete SEO settings
  deleteSEO: async (req, res) => {
    try {
      const deletedSEO = await SEO.findByIdAndDelete(req.params.id);

      if (!deletedSEO) {
        return res.status(404).json({
          success: false,
          message: "SEO settings not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "SEO settings deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error deleting SEO settings",
        error: error.message,
      });
    }
  },
};

module.exports = seoController;
