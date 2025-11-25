// frontend/src/api/systemApi.js
import apiClient from "./apiClient";

const systemApi = {
    /**
     * Get Redis cache contents
     */
    getRedisCache: async () => {
        const response = await apiClient.get("/system/redis");
        return response.data;
    },

    /**
     * Get RabbitMQ status
     */
    getRabbitMQStatus: async () => {
        const response = await apiClient.get("/system/rabbitmq");
        return response.data;
    },

    /**
     * Get event log
     */
    getEventLog: async (limit = 50) => {
        const response = await apiClient.get("/system/events", {
            params: { limit },
        });
        return response.data;
    },

    /**
     * Get detailed health status
     */
    getSystemHealth: async () => {
        const response = await apiClient.get("/system/health");
        return response.data;
    },
};

export default systemApi;
