const Redis = require("ioredis");
const config = require("./index");

class RedisClient {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected && this.client) {
      return this.client;
    }

    try {
      this.client = new Redis(config.redis.url);

      this.client.on("error", (err) => {
        console.error("Redis Client Error:", err);
      });

      this.client.on("connect", () => {
        console.log("Redis connected successfully");
        this.isConnected = true;
      });

      // Wait for ready state
      await this.client.ping();
      return this.client;
    } catch (error) {
      console.error("Redis connection error:", error);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.client && this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
      console.log("Redis disconnected");
    }
  }

  getClient() {
    return this.client;
  }
}

module.exports = new RedisClient();
