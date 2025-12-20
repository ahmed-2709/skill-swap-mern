const express = require("express");
const router = express.Router();
const  protect = require("../middleware/authMiddleware");
const { createOrUpdateProfile, getMyProfile } = require("../controllers/profileController");

router.post("/create", protect, createOrUpdateProfile);
router.get("/me", protect, getMyProfile);

module.exports = router;
