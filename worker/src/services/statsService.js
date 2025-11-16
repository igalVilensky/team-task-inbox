// worker/src/services/statsService.js
const mongoose = require("mongoose");
const Redis = require("ioredis");
const Task = require("../models/Task");
const config = require("../config");

class StatsService {
  constructor() {
    this.redis = new Redis(config.redisURL);
  }

  // Compute task stats and update Redis
  async updateStats() {
    const totalTasks = await Task.countDocuments();
    const statusCounts = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const stats = { totalTasks, byStatus: {} };
    statusCounts.forEach((s) => (stats.byStatus[s._id] = s.count));

    await this.redis.set("taskStats", JSON.stringify(stats));
    console.log("Redis cache updated:", stats);
  }
}

module.exports = new StatsService();
