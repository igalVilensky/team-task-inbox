const app = require("./app");
const config = require("./config");
const database = require("./config/database");
const redisClient = require("./config/redis");
const rabbitMQ = require("./config/rabbitmq");

class Server {
  constructor() {
    this.server = null;
  }

  async initialize() {
    try {
      console.log("Initializing Team Task Inbox Backend...");

      // Initialize all external connections
      await database.connect();
      await redisClient.connect();
      await rabbitMQ.connect();

      console.log("All connections established successfully");
    } catch (error) {
      console.error("Initialization failed:", error);
      process.exit(1);
    }
  }

  async start() {
    await this.initialize();

    // Start HTTP server after all connections are ready
    this.server = app.listen(config.port, () => {
      console.log(
        `Server running on port ${config.port} in ${config.env} mode`
      );
    });

    this.setupGracefulShutdown();
  }

  setupGracefulShutdown() {
    const shutdown = async (signal) => {
      console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

      // Close HTTP server first to stop accepting new requests
      if (this.server) {
        this.server.close(async () => {
          console.log("HTTP server closed");

          try {
            // Close external connections in parallel
            await Promise.all([
              rabbitMQ.disconnect(),
              redisClient.disconnect(),
              database.disconnect(),
            ]);

            console.log("All connections closed gracefully");
            process.exit(0);
          } catch (error) {
            console.error("Error during connection cleanup:", error);
            process.exit(1);
          }
        });
      }

      // Force exit after 10 seconds
      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  }
}

// Start server if this file is run directly
if (require.main === module) {
  const server = new Server();
  server.start();
}

module.exports = Server;
