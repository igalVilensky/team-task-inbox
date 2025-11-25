// frontend/src/store/sagas/systemSaga.js
import { call, put, takeLatest, delay, race, take } from "redux-saga/effects";
import systemApi from "../../api/systemApi";
import * as actions from "../actions/systemActions";
import * as types from "../actions/systemTypes";

// Fetch Redis Cache
function* fetchRedisCacheSaga() {
    try {
        const data = yield call(systemApi.getRedisCache);
        yield put(actions.fetchRedisCacheSuccess(data));
    } catch (error) {
        yield put(actions.fetchRedisCacheFailure(error.message));
    }
}

// Fetch RabbitMQ Status
function* fetchRabbitMQStatusSaga() {
    try {
        const data = yield call(systemApi.getRabbitMQStatus);
        yield put(actions.fetchRabbitMQStatusSuccess(data));
    } catch (error) {
        yield put(actions.fetchRabbitMQStatusFailure(error.message));
    }
}

// Fetch Event Log
function* fetchEventLogSaga() {
    try {
        const data = yield call(systemApi.getEventLog, 50);
        yield put(actions.fetchEventLogSuccess(data));
    } catch (error) {
        yield put(actions.fetchEventLogFailure(error.message));
    }
}

// Fetch System Health
function* fetchSystemHealthSaga() {
    try {
        const data = yield call(systemApi.getSystemHealth);
        yield put(actions.fetchSystemHealthSuccess(data));
    } catch (error) {
        yield put(actions.fetchSystemHealthFailure(error.message));
    }
}

// Polling saga for real-time updates
function* pollSystemDataSaga() {
    while (true) {
        yield put(actions.fetchEventLog());
        yield put(actions.fetchRedisCache());
        yield put(actions.fetchRabbitMQStatus());
        yield put(actions.fetchSystemHealth());

        // Poll every 5 seconds (reduced from 2 for smoother UI)
        yield delay(5000);
    }
}

// Start/Stop polling
function* watchPolling() {
    while (true) {
        yield take(types.START_POLLING);
        yield race([call(pollSystemDataSaga), take(types.STOP_POLLING)]);
    }
}

// Root system saga
export default function* systemSaga() {
    yield takeLatest(types.FETCH_REDIS_CACHE, fetchRedisCacheSaga);
    yield takeLatest(types.FETCH_RABBITMQ_STATUS, fetchRabbitMQStatusSaga);
    yield takeLatest(types.FETCH_EVENT_LOG, fetchEventLogSaga);
    yield takeLatest(types.FETCH_SYSTEM_HEALTH, fetchSystemHealthSaga);
    yield call(watchPolling);
}
