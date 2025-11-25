const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/", taskController.createTask.bind(taskController));
router.patch("/:id", taskController.updateTask.bind(taskController));
router.delete("/:id", taskController.deleteTask.bind(taskController));
router.get("/", taskController.listTasks.bind(taskController));
router.get("/stats", taskController.stats.bind(taskController));

module.exports = router;
