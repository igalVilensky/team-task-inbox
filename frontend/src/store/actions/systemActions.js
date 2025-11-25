// frontend/src/store/actions/systemActions.js
import * as types from "./systemTypes";

export const fetchRedisCache = () => ({
    type: types.FETCH_REDIS_CACHE,
});

export const fetchRedisCacheSuccess = (data) => ({
    type: types.FETCH_REDIS_CACHE_SUCCESS,
    payload: data,
});

export const fetchRedisCacheFailure = (error) => ({
    type: types.FETCH_REDIS_CACHE_FAILURE,
    payload: error,
});

export const fetchRabbitMQStatus = () => ({
    type: types.FETCH_RABBITMQ_STATUS,
});

export const fetchRabbitMQStatusSuccess = (data) => ({
    type: types.FETCH_RABBITMQ_STATUS_SUCCESS,
    payload: data,
});

export const fetchRabbitMQStatusFailure = (error) => ({
    type: types.FETCH_RABBITMQ_STATUS_FAILURE,
    payload: error,
});

export const fetchEventLog = () => ({
    type: types.FETCH_EVENT_LOG,
});

export const fetchEventLogSuccess = (data) => ({
    type: types.FETCH_EVENT_LOG_SUCCESS,
    payload: data,
});

export const fetchEventLogFailure = (error) => ({
    type: types.FETCH_EVENT_LOG_FAILURE,
    payload: error,
});

export const fetchSystemHealth = () => ({
    type: types.FETCH_SYSTEM_HEALTH,
});

export const fetchSystemHealthSuccess = (data) => ({
    type: types.FETCH_SYSTEM_HEALTH_SUCCESS,
    payload: data,
});

export const fetchSystemHealthFailure = (error) => ({
    type: types.FETCH_SYSTEM_HEALTH_FAILURE,
    payload: error,
});

export const startPolling = () => ({
    type: types.START_POLLING,
});

export const stopPolling = () => ({
    type: types.STOP_POLLING,
});
