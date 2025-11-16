// worker/src/consumers/taskConsumer.js
const amqp = require("amqplib");
const config = require("../config");
const statsService = require("../services/statsService");

class TaskConsumer {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.exchange = config.rabbitMQ.exchange;
  }

  async start() {
    this.connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchange, "topic", {
      durable: true,
    });

    const q = await this.channel.assertQueue("", { exclusive: true });

    await this.channel.bindQueue(
      q.queue,
      this.exchange,
      config.rabbitMQ.routingKeys.taskCreated
    );
    await this.channel.bindQueue(
      q.queue,
      this.exchange,
      config.rabbitMQ.routingKeys.taskUpdated
    );

    this.channel.consume(q.queue, async (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        console.log("Received event:", msg.fields.routingKey, content);

        // Update stats in Redis
        await statsService.updateStats();

        this.channel.ack(msg);
      }
    });

    console.log("TaskConsumer started and listening for task events...");
  }

  async stop() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    console.log("TaskConsumer stopped.");
  }
}

module.exports = new TaskConsumer();
