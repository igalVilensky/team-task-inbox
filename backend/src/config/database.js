const mongoose = require("mongoose");
const config = require("./index");

class Database {
  constructor() {
    this.mongoose = mongoose;
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) {
      return this.mongoose;
    }

    try {
      await this.mongoose.connect(config.mongodb.uri);
      this.isConnected = true;
      console.log("MongoDB connected successfully");
      return this.mongoose;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await this.mongoose.connection.close();
      this.isConnected = false;
      console.log("MongoDB disconnected");
    }
  }

  getMongoose() {
    return this.mongoose;
  }

  getConnection() {
    return this.mongoose.connection;
  }
}

module.exports = new Database();
