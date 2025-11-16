const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");

const app = require("../src/app");
const Task = require("../src/models/Task");
const redisClient = require("../src/config/redis");

const { expect } = chai;
chai.use(chaiHttp);

describe("Stats API", () => {
  let redisStub;

  beforeEach(async () => {
    await Task.deleteMany({});

    // Stub redis.connect() to return a fake redis instance
    redisStub = {
      get: sinon.stub(),
      set: sinon.stub(),
      quit: sinon.stub(),
    };

    sinon.stub(redisClient, "connect").resolves(redisStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return cached stats from Redis when available", async () => {
    const cached = {
      totalTasks: 5,
      byStatus: { new: 3, done: 2 },
    };

    redisStub.get.resolves(JSON.stringify(cached));

    const res = await chai.request(app).get("/api/v1/stats");

    expect(res).to.have.status(200);
    expect(res.body.totalTasks).to.equal(5);
    expect(res.body.byStatus.new).to.equal(3);
    expect(res.body.byStatus.done).to.equal(2);
  });

  it("should compute stats from MongoDB when Redis has no cache", async () => {
    redisStub.get.resolves(null); // no cache

    await Task.create([
      { title: "A", status: "new" },
      { title: "B", status: "new" },
      { title: "C", status: "done" },
    ]);

    const res = await chai.request(app).get("/api/v1/stats");

    expect(res).to.have.status(200);
    expect(res.body.totalTasks).to.equal(3);
    expect(res.body.byStatus.new).to.equal(2);
    expect(res.body.byStatus.done).to.equal(1);
  });

  it("should reflect worker-updated stats immediately", async () => {
    // Worker’s updated cache
    const workerUpdated = {
      totalTasks: 10,
      byStatus: { new: 7, done: 3 },
    };

    redisStub.get.resolves(JSON.stringify(workerUpdated));

    const res = await chai.request(app).get("/api/v1/stats");

    expect(res).to.have.status(200);
    expect(res.body.totalTasks).to.equal(10);
    expect(res.body.byStatus.new).to.equal(7);
    expect(res.body.byStatus.done).to.equal(3);
  });
});
