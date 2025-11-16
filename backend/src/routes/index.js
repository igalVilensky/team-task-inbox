const express = require("express");
const router = express.Router();
const taskRoutes = require("./taskRoutes");

router.use("/v1/tasks", taskRoutes);

module.exports = router;
