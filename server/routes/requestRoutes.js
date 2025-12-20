const express = require("express");
const router = express.Router();
const { sendRequest, recieveRequest, updateRequest } = require("../controllers/requestController");
const protect = require("../middleware/authMiddleware");

router.post("/send", protect, sendRequest);
router.get("/received", protect, recieveRequest);
router.put("/update", protect, updateRequest);

module.exports = router;
