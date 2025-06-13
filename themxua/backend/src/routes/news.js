const express = require("express");
const router = express.Router();
const { News } = require("../models/news");

// Get all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news", error: error.message });
  }
});

// Get news by slug
router.get("/:slug", async (req, res) => {
  try {
    const newsItem = await News.findOne({ slug: req.params.slug });
    if (!newsItem) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.json(newsItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news article", error: error.message });
  }
});

module.exports = router;
