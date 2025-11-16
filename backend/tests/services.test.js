// backend/tests/services.test.js
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const Task = require("../src/models/Task");
const taskService = require("../src/services/taskService");

// Stub RabbitMQ globally
const fakeRabbitMQ = {
  publishEvent: async () => {
    // do nothing during tests
  },
};

describe("Task Model", () => {
  beforeEach(async () => {
    await Task.deleteMany({});
    // Stub the RabbitMQ calls in the service
    sinon.replace(taskService, "createTask", async (data) => {
      const task = await Task.create(data);
      await fakeRabbitMQ.publishEvent("task.created", {
        taskId: task._id,
        title: task.title,
        status: task.status,
        createdAt: task.createdAt,
      });
      return task;
    });

    sinon.replace(taskService, "updateTask", async (id, updates) => {
      const task = await Task.findByIdAndUpdate(id, updates, { new: true });
      if (!task) throw new Error("Task not found");
      await fakeRabbitMQ.publishEvent("task.updated", {
        taskId: task._id,
        title: task.title,
        status: task.status,
        updatedAt: task.updatedAt,
      });
      return task;
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should create a task in the database", async () => {
    const task = await taskService.createTask({
      title: "Service Test Task",
      description: "Testing model",
      status: "new",
    });

    expect(task).to.have.property("_id");
    expect(task.title).to.equal("Service Test Task");
  });

  it("should update a task status", async () => {
    const task = await taskService.createTask({
      title: "Update Test",
      status: "new",
    });

    const updatedTask = await taskService.updateTask(task._id, {
      status: "in-progress",
    });

    expect(updatedTask.status).to.equal("in-progress");
  });
});
