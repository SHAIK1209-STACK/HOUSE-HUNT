const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get Logged-in User Profile
router.get("/profile", authMiddleware, getProfile);

// Update Logged-in User Profile
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;