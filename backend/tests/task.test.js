// backend/tests/task.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../src/app");
const Task = require("../src/models/Task");
const taskService = require("../src/services/taskService");
const rabbitMQ = require("../src/config/rabbitmq"); // real module path

const { expect } = chai;
chai.use(chaiHttp);

describe("Task API", () => {
  beforeEach(async () => {
    await Task.deleteMany({});

    // stub rabbitMQ.publishEvent so it does nothing
    sinon.stub(taskService, "createTask").callsFake(async (data) => {
      const task = await Task.create(data);
      // call the stubbed global rabbitMQ
      await global.__RABBITMQ__.publishEvent("task.created", {
        taskId: task._id,
        title: task.title,
        status: task.status,
        createdAt: task.createdAt,
      });
      return task;
    });
  });

  afterEach(() => {
    // restore the stub
    sinon.restore();
  });

  it("should create a new task", async () => {
    const res = await chai.request(app).post("/api/v1/tasks").send({
      title: "Test Task",
      description: "Test description",
      status: "new",
    });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("_id");
    expect(res.body.title).to.equal("Test Task");
    expect(res.body.status).to.equal("new");
  });

  it("should list tasks", async () => {
    await Task.create({
      title: "Existing Task",
      description: "For listing",
      status: "new",
    });

    const res = await chai.request(app).get("/api/v1/tasks");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").with.lengthOf(1);
    expect(res.body[0].title).to.equal("Existing Task");
  });
});
