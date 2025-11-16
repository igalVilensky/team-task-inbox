const Task = require("../models/Task");
const rabbitMQ = require("../config/rabbitmq");

class TaskService {
  async createTask(data) {
    const task = await Task.create(data);

    // Minimal event payload
    await rabbitMQ.publishEvent("task.created", {
      taskId: task._id,
      title: task.title,
      status: task.status,
      createdAt: task.createdAt,
    });

    return task;
  }

  async updateTask(id, updates) {
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!task) throw new Error("Task not found");

    await rabbitMQ.publishEvent("task.updated", {
      taskId: task._id,
      title: task.title,
      status: task.status,
      updatedAt: task.updatedAt,
    });

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

    return Task.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);
  }

  async computeStats() {
    const totalTasks = await Task.countDocuments();
    const statusCounts = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const stats = { totalTasks, byStatus: {} };
    statusCounts.forEach((s) => (stats.byStatus[s._id] = s.count));

    return stats;
  }
}

module.exports = new TaskService();
