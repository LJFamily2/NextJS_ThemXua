const Events = require("../models/events");
const fs = require("fs").promises;
const path = require("path");

const deleteImageFile = async (imagePath) => {
  try {
    await fs.unlink(imagePath);
  } catch (err) {
    console.log("Error deleting image file:", err);
  }
};

// Get all events for admin
const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

// Create new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, published } = req.body;

    const image = req.files?.image?.[0]?.filename || null;
    const imageMobile = req.files?.imageMobile?.[0]?.filename || null;

    const eventData = {
      title,
      description,
      date,
      time,
      location,
      image,
      imageMobile,
      published: published === "true",
    };

    const newEvent = await Events.create(eventData);
    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating event", error: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location, published } = req.body;

    const event = await Events.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updateFields = {
      title,
      description,
      date,
      time,
      location,
      published: published === "true",
    };

    // Handle file uploads
    const newImage = req.files?.newImage?.[0]?.filename;
    const newImageMobile = req.files?.newImageMobile?.[0]?.filename;

    if (newImage) {
      if (event.image) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", event.image)
        );
      }
      updateFields.image = newImage;
    }

    if (newImageMobile) {
      if (event.imageMobile) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", event.imageMobile)
        );
      }
      updateFields.imageMobile = newImageMobile;
    }

    const updatedEvent = await Events.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating event", error: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Events.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete associated files
    const filesToDelete = [event.image, event.imageMobile].filter(Boolean);

    for (const file of filesToDelete) {
      await deleteImageFile(path.join(__dirname, "../../uploads", file));
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};

// Delete all events
const deleteAllEvents = async (req, res) => {
  try {
    const events = await Events.find();

    // Delete all files first
    for (const event of events) {
      const filesToDelete = [event.image, event.imageMobile].filter(Boolean);

      for (const file of filesToDelete) {
        await deleteImageFile(path.join(__dirname, "../../uploads", file));
      }
    }

    // Delete all events from database
    await Events.deleteMany({});

    res.json({ message: "All events deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting all events", error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  deleteAllEvents,
};
