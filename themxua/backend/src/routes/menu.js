const express = require("express");
const router = express.Router();
const MenuArea = require("../models/menu");

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuArea.find();
    res.json(menuItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching menu items", error: error.message });
  }
});

// Get menu item by ID
router.get("/:id", async (req, res) => {
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
});

module.exports = router;
