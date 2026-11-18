const express = require("express");
const router = express.Router();

const {getRecommendations} = require("../controllers/analyticsController");

const {authMiddleware} = require("../middleware/authMiddleware");

router.get("/recommendations", authMiddleware, getRecommendations);

module.exports = router;