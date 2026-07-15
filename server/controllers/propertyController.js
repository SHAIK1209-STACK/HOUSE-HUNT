const Property = require("../models/Property");

// =========================
// Add Property
// =========================
const addProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
    } = req.body;

    const property = new Property({
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      image: req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : "",
    });

    await property.save();

    res.status(201).json({
      success: true,
      message: "Property Added Successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Properties
// =========================
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Property By ID
// =========================
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Update Property
// =========================
const updateProperty = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Property Updated Successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Property
// =========================
const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};