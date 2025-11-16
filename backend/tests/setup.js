// backend/tests/setup.js
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Mock RabbitMQ for tests
const rabbitMQ = {
  publishEvent: async () => {
    // do nothing during tests
  },
};
global.__RABBITMQ__ = rabbitMQ;

before(async function () {
  this.timeout(15000); // increase timeout
  const mongoServer = await MongoMemoryServer.create();
  global.__MONGO_URI__ = mongoServer.getUri();

  await mongoose.connect(global.__MONGO_URI__, {
    dbName: "team-task-inbox-test",
  });

  global.__MONGO_SERVER__ = mongoServer;
});

// Clear DB after each test
afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// Stop in-memory MongoDB after all tests
after(async () => {
  await mongoose.connection.close();
  await global.__MONGO_SERVER__.stop();
});
