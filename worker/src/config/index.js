// worker/src/config/index.js
require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  mongoURI:
    process.env.MONGODB_URI || "mongodb://tti-mongo:27017/team-task-inbox",
  redisURL: process.env.REDIS_URL || "redis://tti-redis:6379",
  rabbitMQ: {
    url: process.env.RABBITMQ_URL || "amqp://tti-rabbitmq:5672",
    exchange: "team-task-inbox.events",
    routingKeys: {
      taskCreated: "task.created",
      taskUpdated: "task.updated",
    },
  },
};

module.exports = config;
