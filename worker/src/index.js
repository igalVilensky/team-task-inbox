// worker/src/index.js
const mongoose = require("mongoose");
const config = require("./config");
const TaskConsumer = require("./consumers/taskConsumer");

async function startWorker() {
  try {
    console.log("Starting Worker...");

    // Connect to MongoDB
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB connected");

    // Start RabbitMQ consumer
    await TaskConsumer.start();

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("SIGINT received, shutting down...");
      await TaskConsumer.stop();
      await mongoose.disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, shutting down...");
      await TaskConsumer.stop();
      await mongoose.disconnect();
      process.exit(0);
    });
  } catch (err) {
    console.error("Worker initialization failed:", err);
    process.exit(1);
  }
}

startWorker();
