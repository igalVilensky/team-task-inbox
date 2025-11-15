const dotenv = require("dotenv");

// Load environment variables first
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3001,
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/team-task-inbox",
  },
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || "amqp://localhost:5672",
    exchange: "team-task-inbox.events",
    routingKeys: {
      taskCreated: "task.created",
      taskUpdated: "task.updated",
    },
  },
};

module.exports = config;
