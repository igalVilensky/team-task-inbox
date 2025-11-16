// src/routes/statsRoutes.js
const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

router.get("/", statsController.getStats.bind(statsController));

module.exports = router;
