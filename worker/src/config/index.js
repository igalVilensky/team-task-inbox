// worker/src/config/index.js
require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  mongoURI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/team-task-inbox",
  redisURL: process.env.REDIS_URL || "redis://localhost:6379",
  rabbitMQ: {
    url: process.env.RABBITMQ_URL || "amqp://127.0.0.1:5672",
    exchange: "team-task-inbox.events",
    routingKeys: {
      taskCreated: "task.created",
      taskUpdated: "task.updated",
    },
  },
};

module.exports = config;
