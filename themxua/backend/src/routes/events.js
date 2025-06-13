const express = require("express");
const router = express.Router();
const Events = require("../models/events");

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Events.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
});

// Get event by slug
router.get("/:slug", async (req, res) => {
  try {
    const event = await Events.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
});

module.exports = router;
