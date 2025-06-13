const MenuArea = require("../models/menu");
const fs = require("fs").promises;
const path = require("path");

const deleteImageFile = async (imagePath) => {
  try {
    await fs.unlink(imagePath);
  } catch (err) {
    console.log("Error deleting image file:", err);
  }
};

// Get all menu items for admin
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuArea.find();
    res.json(menuItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu items", error: error.message });
  }
};

// Get menu item by ID
const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuArea.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json(menuItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu item", error: error.message });
  }
};

// Create new menu item
const createMenuItem = async (req, res) => {
  try {
    const { description } = req.body;

    const image = req.files?.image?.[0]?.filename || null;
    const imageMobile = req.files?.imageMobile?.[0]?.filename || null;
    const URL = req.files?.URL?.[0]?.filename || null;
    const URLMobile = req.files?.URLMobile?.[0]?.filename || null;

    const menuData = {
      description,
      image,
      imageMobile,
      URL,
      URLMobile,
    };

    const newMenuItem = await MenuArea.create(menuData);
    res.status(201).json({
      message: "Menu item created successfully",
      menuItem: newMenuItem,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating menu item", error: error.message });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const menuItem = await MenuArea.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const updateFields = { description };

    // Handle file uploads
    const newImage = req.files?.newImage?.[0]?.filename;
    const newImageMobile = req.files?.newImageMobile?.[0]?.filename;
    const newURL = req.files?.newURL?.[0]?.filename;
    const newURLMobile = req.files?.newURLMobile?.[0]?.filename;

    if (newImage) {
      if (menuItem.image) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", menuItem.image)
        );
      }
      updateFields.image = newImage;
    }

    if (newImageMobile) {
      if (menuItem.imageMobile) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", menuItem.imageMobile)
        );
      }
      updateFields.imageMobile = newImageMobile;
    }

    if (newURL) {
      if (menuItem.URL) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", menuItem.URL)
        );
      }
      updateFields.URL = newURL;
    }

    if (newURLMobile) {
      if (menuItem.URLMobile) {
        await deleteImageFile(
          path.join(__dirname, "../../uploads", menuItem.URLMobile)
        );
      }
      updateFields.URLMobile = newURLMobile;
    }

    const updatedMenuItem = await MenuArea.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.json({
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating menu item", error: error.message });
  }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuArea.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Delete associated files
    const filesToDelete = [
      menuItem.image,
      menuItem.imageMobile,
      menuItem.URL,
      menuItem.URLMobile,
    ].filter(Boolean);

    for (const file of filesToDelete) {
      await deleteImageFile(path.join(__dirname, "../../uploads", file));
    }

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting menu item", error: error.message });
  }
};

// Delete all menu items
const deleteAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuArea.find();

    // Delete all files first
    for (const item of menuItems) {
      const filesToDelete = [
        item.image,
        item.imageMobile,
        item.URL,
        item.URLMobile,
      ].filter(Boolean);

      for (const file of filesToDelete) {
        await deleteImageFile(path.join(__dirname, "../../uploads", file));
      }
    }

    // Delete all menu items from database
    await MenuArea.deleteMany({});

    res.json({ message: "All menu items deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting all menu items", error: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  deleteAllMenuItems,
};
