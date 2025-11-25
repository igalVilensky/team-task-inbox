const Task = require("../models/Task");
const rabbitMQ = require("../config/rabbitmq");
const redisClient = require("../config/redis");
const eventLogger = require("../utils/eventLogger");

class TaskService {
  async createTask(data) {
    const task = await Task.create(data);

    // Log MongoDB operation
    eventLogger.logMongoDB("CREATE", "tasks", data, {
      id: task._id,
      title: task.title,
    });

    // Minimal event payload
    const eventPayload = {
      taskId: task._id,
      title: task.title,
      status: task.status,
      createdAt: task.createdAt,
    };

    await rabbitMQ.publishEvent("task.created", eventPayload);

    // Log RabbitMQ publish
    eventLogger.logRabbitMQ("PUBLISH", "task.created", eventPayload);

    return task;
  }

  async updateTask(id, updates) {
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!task) throw new Error("Task not found");

    // Log MongoDB operation
    eventLogger.logMongoDB("UPDATE", "tasks", { id, updates }, {
      id: task._id,
      title: task.title,
      status: task.status,
    });

    const eventPayload = {
      taskId: task._id,
      title: task.title,
      status: task.status,
      updatedAt: task.updatedAt,
    };

    await rabbitMQ.publishEvent("task.updated", eventPayload);

    // Log RabbitMQ publish
    eventLogger.logRabbitMQ("PUBLISH", "task.updated", eventPayload);

    return task;
  }

  async listTasks({
    status,
    skip = 0,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const query = {};
    if (status) query.status = status;

    const tasks = await Task.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    // Log MongoDB operation
    eventLogger.logMongoDB("FIND", "tasks", query, {
      count: tasks.length,
      skip,
      limit,
    });

    return tasks;
  }

  async computeStats() {
    // Connect to Redis
    const redis = await redisClient.connect();

    // Try cache first
    const cachedStats = await redis.get("taskStats");
    if (cachedStats) {
      console.log("Using cached stats from Redis");
      eventLogger.logRedis("CACHE_HIT", "taskStats", cachedStats);
      return JSON.parse(cachedStats);
    }

    // Log cache miss
    eventLogger.logRedis("CACHE_MISS", "taskStats", null);

    // Fallback to MongoDB (cache miss)
    const totalTasks = await Task.countDocuments();
    const statusCounts = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const stats = { totalTasks, byStatus: {} };
    statusCounts.forEach((s) => (stats.byStatus[s._id] = s.count));

    // Log MongoDB operation
    eventLogger.logMongoDB("AGGREGATE", "tasks", "stats", stats);

    return stats;
  }
}

module.exports = new TaskService();
