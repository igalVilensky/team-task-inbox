// src/controllers/statsController.js
const taskService = require("../services/taskService");
const redisClient = require("../config/redis");

class StatsController {
  async getStats(req, res) {
    try {
      const redis = await redisClient.connect();
      const cached = await redis.get("taskStats");

      if (cached) {
        return res.json(JSON.parse(cached));
      }

      // No cache → compute from Mongo
      const stats = await taskService.computeStats();

      // Cache it
      await redis.set("taskStats", JSON.stringify(stats));

      return res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new StatsController();
