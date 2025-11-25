// backend/src/utils/eventLogger.js
class EventLogger {
    constructor(maxEvents = 100) {
        this.events = [];
        this.maxEvents = maxEvents;
    }

    log(type, category, details) {
        const event = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            type, // 'API', 'RABBITMQ', 'REDIS', 'MONGODB', 'SAGA'
            category, // 'REQUEST', 'PUBLISH', 'CACHE_SET', 'QUERY', etc.
            details,
        };

        this.events.unshift(event);

        // Keep only the last maxEvents
        if (this.events.length > this.maxEvents) {
            this.events = this.events.slice(0, this.maxEvents);
        }

        // Also log to console for debugging
        console.log(
            `[${event.type}] ${event.category}:`,
            JSON.stringify(event.details)
        );

        return event;
    }

    getRecentEvents(limit = 50) {
        return this.events.slice(0, limit);
    }

    clear() {
        this.events = [];
    }

    // Convenience methods for different event types
    logAPI(method, path, status, duration) {
        return this.log("API", "REQUEST", {
            method,
            path,
            status,
            duration: `${duration}ms`,
        });
    }

    logRabbitMQ(action, routingKey, message) {
        return this.log("RABBITMQ", action, {
            routingKey,
            message,
        });
    }

    logRedis(operation, key, value) {
        return this.log("REDIS", operation, {
            key,
            value: typeof value === "object" ? JSON.stringify(value) : value,
        });
    }

    logMongoDB(operation, collection, query, result) {
        return this.log("MONGODB", operation, {
            collection,
            query,
            result,
        });
    }
}

// Singleton instance
module.exports = new EventLogger();
