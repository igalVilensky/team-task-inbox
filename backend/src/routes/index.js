// src/routes/index.js
const express = require("express");
const router = express.Router();
const taskRoutes = require("./taskRoutes");
const statsRoutes = require("./statsRoutes");

router.use("/v1/tasks", taskRoutes);
router.use("/v1/stats", statsRoutes);

module.exports = router;
