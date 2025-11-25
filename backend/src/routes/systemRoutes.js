// backend/src/routes/systemRoutes.js
const express = require("express");
const router = express.Router();
const systemController = require("../controllers/systemController");

// Educational endpoints for monitoring system internals
router.get("/redis", systemController.getRedisCache.bind(systemController));
router.get(
    "/rabbitmq",
    systemController.getRabbitMQStatus.bind(systemController)
);
router.get("/events", systemController.getEventLog.bind(systemController));
router.get("/health", systemController.getDetailedHealth.bind(systemController));

module.exports = router;
