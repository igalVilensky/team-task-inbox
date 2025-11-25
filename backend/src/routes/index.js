// src/routes/index.js
const express = require("express");
const router = express.Router();
const taskRoutes = require("./taskRoutes");
const statsRoutes = require("./statsRoutes");
const systemRoutes = require("./systemRoutes");

router.use("/v1/tasks", taskRoutes);
router.use("/v1/stats", statsRoutes);
router.use("/v1/system", systemRoutes);

module.exports = router;
