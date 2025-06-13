const { News } = require("../models/news");
const fs = require("fs").promises;
const path = require("path");

const deleteImageFile = async (imagePath) => {
  try {
    await fs.unlink(imagePath);
  } catch (err) {
    console.log("Error deleting image file:", err);
  }
};

// Get all news articles for admin
const getAllNewsArticles = async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ createdAt: -1 });
    res.json(newsArticles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news articles", error: error.message });
  }
};

// Get news article by ID
const getNewsArticleById = async (req, res) => {
  try {
    const newsArticle = await News.findById(req.params.id);
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.json(newsArticle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news article", error: error.message });
  }
};

// Get news article by slug
const getNewsArticleBySlug = async (req, res) => {
  try {
    const newsArticle = await News.findOne({ slug: req.params.slug });
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.json(newsArticle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news article", error: error.message });
  }
};

// Create new news article
const createNewsArticle = async (req, res) => {
  try {
    const { title, content, author, published } = req.body;

    const picture = req.files?.picture?.[0]?.filename || null;

    // Generate slug from title
    const slug =
      title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-") +
      "-" +
      Date.now();

    const newsData = {
      title,
      slug,
      content,
      author,
      picture,
      published: published === "true",
      details: [],
    };

    const newNewsArticle = await News.create(newsData);
    res.status(201).json({
      message: "News article created successfully",
      newsArticle: newNewsArticle,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating news article", error: error.message });
  }
};

// Update news article
const updateNewsArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, published } = req.body;

    const newsArticle = await News.findById(id);
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }

    const updateFields = {
      title,
      content,
      author,
      published: published === "true",
    };

    // Update slug if title changed
    if (title !== newsArticle.title) {
      updateFields.slug =
        title
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-") +
        "-" +
        Date.now();
    }

    // Handle picture update
    if (req.files?.picture?.[0]) {
      if (newsArticle.picture) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", newsArticle.picture)
        );
      }
      updateFields.picture = req.files.picture[0].filename;
    }

    const updatedNewsArticle = await News.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.json({
      message: "News article updated successfully",
      newsArticle: updatedNewsArticle,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating news article", error: error.message });
  }
};

// Add detail to news article
const addNewsDetail = async (req, res) => {
  try {
    const { newsId, heading, description } = req.body;

    const image = req.files?.image?.[0]?.filename || null;

    const newsArticle = await News.findById(newsId);
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }

    const newDetail = {
      heading,
      description,
      image,
    };

    newsArticle.details.push(newDetail);
    await newsArticle.save();

    res.status(201).json({
      message: "News detail added successfully",
      newsArticle,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding news detail", error: error.message });
  }
};

// Update news detail
const updateNewsDetail = async (req, res) => {
  try {
    const { newsId, detailId } = req.params;
    const { heading, description } = req.body;

    const newsArticle = await News.findById(newsId);
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }

    const detail = newsArticle.details.id(detailId);
    if (!detail) {
      return res.status(404).json({ message: "News detail not found" });
    }

    detail.heading = heading;
    detail.description = description;

    // Handle image update
    if (req.files?.image?.[0]) {
      if (detail.image) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", detail.image)
        );
      }
      detail.image = req.files.image[0].filename;
    }

    await newsArticle.save();

    res.json({
      message: "News detail updated successfully",
      newsArticle,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating news detail", error: error.message });
  }
};

// Delete news detail
const deleteNewsDetail = async (req, res) => {
  try {
    const { newsId, detailId } = req.params;

    const newsArticle = await News.findById(newsId);
    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }

    const detail = newsArticle.details.id(detailId);
    if (!detail) {
      return res.status(404).json({ message: "News detail not found" });
    }

    // Delete image file if exists
    if (detail.image) {
      await deleteImageFile(
        path.join(__dirname, "../../uploads", detail.image)
      );
    }

    newsArticle.details.pull(detailId);
    await newsArticle.save();

    res.json({ message: "News detail deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting news detail", error: error.message });
  }
};

// Delete news article
const deleteNewsArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const newsArticle = await News.findByIdAndDelete(id);

    if (!newsArticle) {
      return res.status(404).json({ message: "News article not found" });
    }

    // Delete main picture
    if (newsArticle.picture) {
      await deleteImageFile(
        path.join(__dirname, "../../uploads", newsArticle.picture)
      );
    }

    // Delete detail images
    for (const detail of newsArticle.details) {
      if (detail.image) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", detail.image)
        );
      }
    }

    res.json({ message: "News article deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting news article", error: error.message });
  }
};

// Delete all news articles
const deleteAllNewsArticles = async (req, res) => {
  try {
    const newsArticles = await News.find();

    // Delete all files first
    for (const article of newsArticles) {
      if (article.picture) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", article.picture)
        );
      }

      for (const detail of article.details) {
        if (detail.image) {
          await deleteImageFile(
            path.join(__dirname, "../../uploads", detail.image)
          );
        }
      }
    }

    // Delete all news articles from database
    await News.deleteMany({});

    res.json({ message: "All news articles deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting all news articles",
        error: error.message,
      });
  }
};

module.exports = {
  getAllNewsArticles,
  getNewsArticleById,
  getNewsArticleBySlug,
  createNewsArticle,
  updateNewsArticle,
  addNewsDetail,
  updateNewsDetail,
  deleteNewsDetail,
  deleteNewsArticle,
  deleteAllNewsArticles,
};
