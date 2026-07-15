const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

// Add Property with Image Upload
router.post("/add", upload.single("image"), addProperty);

// Get All Properties
router.get("/", getAllProperties);

// Get Property by ID
router.get("/:id", getPropertyById);

// Update Property
router.put("/update/:id", upload.single("image"), updateProperty);

// Delete Property
router.delete("/delete/:id", deleteProperty);

module.exports = router;