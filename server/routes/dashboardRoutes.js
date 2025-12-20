const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { dashboardData } = require("../controllers/dashboardController");

router.get("/",protect, dashboardData);

module.exports = router;
