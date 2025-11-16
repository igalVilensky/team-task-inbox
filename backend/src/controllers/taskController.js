const taskService = require("../services/taskService");

class TaskController {
  async createTask(req, res) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async listTasks(req, res) {
    try {
      const tasks = await taskService.listTasks(req.query);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async stats(req, res) {
    try {
      const stats = await taskService.computeStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new TaskController();
