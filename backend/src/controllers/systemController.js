// backend/src/controllers/systemController.js
const redisClient = require("../config/redis");
const rabbitMQ = require("../config/rabbitmq");
const mongoose = require("mongoose");
const eventLogger = require("../utils/eventLogger");

class SystemController {
    /**
     * Get Redis cache contents
     * Educational endpoint to show what's cached
     */
    async getRedisCache(req, res) {
        try {
            const client = redisClient.getClient();
            if (!client) {
                return res.status(503).json({ error: "Redis not connected" });
            }

            // Get all keys
            const keys = await client.keys("*");
            const cacheData = {};

            // Get values for each key
            for (const key of keys) {
                const value = await client.get(key);
                const ttl = await client.ttl(key);

                cacheData[key] = {
                    value: value ? JSON.parse(value) : null,
                    ttl: ttl > 0 ? ttl : "no expiration",
                };
            }

            eventLogger.logAPI(req.method, req.path, 200, 0);

            res.json({
                connected: true,
                totalKeys: keys.length,
                cache: cacheData,
            });
        } catch (err) {
            eventLogger.logAPI(req.method, req.path, 500, 0);
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Get RabbitMQ status
     * Educational endpoint to show message queue status
     */
    async getRabbitMQStatus(req, res) {
        try {
            const isConnected = rabbitMQ.isConnected;
            const exchange = rabbitMQ.getExchange();

            eventLogger.logAPI(req.method, req.path, 200, 0);

            res.json({
                connected: isConnected,
                exchange: exchange,
                type: "topic",
                durable: true,
                routingKeys: {
                    taskCreated: "task.created",
                    taskUpdated: "task.updated",
                },
            });
        } catch (err) {
            eventLogger.logAPI(req.method, req.path, 500, 0);
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Get recent event log
     * Educational endpoint to show system events
     */
    async getEventLog(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 50;
            const events = eventLogger.getRecentEvents(limit);

            res.json({
                total: events.length,
                events,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    /**
     * Get detailed health status
     * Educational endpoint to show all service statuses
     */
    async getDetailedHealth(req, res) {
        try {
            const health = {
                timestamp: new Date().toISOString(),
                services: {},
            };

            // MongoDB status
            health.services.mongodb = {
                connected: mongoose.connection.readyState === 1,
                state: mongoose.connection.readyState,
                stateDescription: this._getMongoStateDescription(
                    mongoose.connection.readyState
                ),
                database: mongoose.connection.name,
            };

            // Redis status
            const redisConnected = redisClient.isConnected;
            health.services.redis = {
                connected: redisConnected,
                status: redisConnected ? "ready" : "disconnected",
            };

            // RabbitMQ status
            health.services.rabbitmq = {
                connected: rabbitMQ.isConnected,
                exchange: rabbitMQ.getExchange(),
            };

            // Overall status
            health.status =
                health.services.mongodb.connected &&
                    health.services.redis.connected &&
                    health.services.rabbitmq.connected
                    ? "healthy"
                    : "degraded";

            eventLogger.logAPI(req.method, req.path, 200, 0);

            res.json(health);
        } catch (err) {
            eventLogger.logAPI(req.method, req.path, 500, 0);
            res.status(500).json({ error: err.message });
        }
    }

    _getMongoStateDescription(state) {
        const states = {
            0: "disconnected",
            1: "connected",
            2: "connecting",
            3: "disconnecting",
        };
        return states[state] || "unknown";
    }
}

module.exports = new SystemController();
