const amqp = require("amqplib");
const config = require("./index");

class RabbitMQ {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.isConnected = false;
    this.exchange = config.rabbitmq.exchange;
  }

  async connect() {
    if (this.isConnected && this.connection && this.channel) {
      return { connection: this.connection, channel: this.channel };
    }

    try {
      this.connection = await amqp.connect(config.rabbitmq.url);
      this.channel = await this.connection.createChannel();

      // Assert topic exchange
      await this.channel.assertExchange(this.exchange, "topic", {
        durable: true,
      });

      this.isConnected = true;
      console.log("RabbitMQ connected and exchange asserted successfully");
      return { connection: this.connection, channel: this.channel };
    } catch (error) {
      console.error("RabbitMQ connection error:", error);
      process.exit(1);
    }
  }

  async publishEvent(routingKey, message) {
    if (!this.isConnected || !this.channel) {
      throw new Error("RabbitMQ not connected");
    }

    try {
      const stringMessage = JSON.stringify(message);
      const published = this.channel.publish(
        this.exchange,
        routingKey,
        Buffer.from(stringMessage),
        { persistent: true }
      );

      if (published) {
        console.log(
          `Event published to ${this.exchange} with routing key ${routingKey}`
        );
      }

      return published;
    } catch (error) {
      console.error("Event publish error:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    this.isConnected = false;
    console.log("RabbitMQ disconnected");
  }

  getChannel() {
    return this.channel;
  }

  getConnection() {
    return this.connection;
  }

  getExchange() {
    return this.exchange;
  }
}

module.exports = new RabbitMQ();
