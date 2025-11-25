// frontend/src/store/reducers/systemReducer.js
import * as types from "../actions/systemTypes";

const initialState = {
    redis: {
        data: null,
        loading: false,
        error: null,
    },
    rabbitmq: {
        data: null,
        loading: false,
        error: null,
    },
    events: {
        data: [],
        loading: false,
        error: null,
    },
    health: {
        data: null,
        loading: false,
        error: null,
    },
    isPolling: false,
};

const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        // Redis Cache
        case types.FETCH_REDIS_CACHE:
            return {
                ...state,
                redis: { ...state.redis, loading: true, error: null },
            };
        case types.FETCH_REDIS_CACHE_SUCCESS:
            return {
                ...state,
                redis: { data: action.payload, loading: false, error: null },
            };
        case types.FETCH_REDIS_CACHE_FAILURE:
            return {
                ...state,
                redis: { ...state.redis, loading: false, error: action.payload },
            };

        // RabbitMQ Status
        case types.FETCH_RABBITMQ_STATUS:
            return {
                ...state,
                rabbitmq: { ...state.rabbitmq, loading: true, error: null },
            };
        case types.FETCH_RABBITMQ_STATUS_SUCCESS:
            return {
                ...state,
                rabbitmq: { data: action.payload, loading: false, error: null },
            };
        case types.FETCH_RABBITMQ_STATUS_FAILURE:
            return {
                ...state,
                rabbitmq: { ...state.rabbitmq, loading: false, error: action.payload },
            };

        // Event Log
        case types.FETCH_EVENT_LOG:
            return {
                ...state,
                events: { ...state.events, loading: true, error: null },
            };
        case types.FETCH_EVENT_LOG_SUCCESS:
            return {
                ...state,
                events: {
                    data: action.payload.events || [],
                    loading: false,
                    error: null,
                },
            };
        case types.FETCH_EVENT_LOG_FAILURE:
            return {
                ...state,
                events: { ...state.events, loading: false, error: action.payload },
            };

        // System Health
        case types.FETCH_SYSTEM_HEALTH:
            return {
                ...state,
                health: { ...state.health, loading: true, error: null },
            };
        case types.FETCH_SYSTEM_HEALTH_SUCCESS:
            return {
                ...state,
                health: { data: action.payload, loading: false, error: null },
            };
        case types.FETCH_SYSTEM_HEALTH_FAILURE:
            return {
                ...state,
                health: { ...state.health, loading: false, error: action.payload },
            };

        // Polling
        case types.START_POLLING:
            return { ...state, isPolling: true };
        case types.STOP_POLLING:
            return { ...state, isPolling: false };

        default:
            return state;
    }
};

export default systemReducer;
