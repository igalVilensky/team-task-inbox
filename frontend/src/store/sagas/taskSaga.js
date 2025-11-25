import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "../actions/taskTypes";
import { fetchTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from "../../api/taskApi";
import { fetchStats } from "../actions/statsActions"; // <-- import fetchStats

// --- Fetch tasks saga ---
function* fetchTasksSaga() {
  try {
    const data = yield call(fetchTasksApi);
    yield put({ type: types.TASK_FETCH_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.TASK_FETCH_FAILURE, payload: error.message });
  }
}

// --- Create task saga ---
function* createTaskSaga(action) {
  try {
    const newTask = yield call(createTaskApi, action.payload);
    yield put({ type: types.TASK_CREATE_SUCCESS, payload: newTask });
    yield put(fetchStats());
  } catch (error) {
    yield put({ type: types.TASK_CREATE_FAILURE, payload: error.message });
  }
}

// --- Update task saga ---
function* updateTaskSaga(action) {
  try {
    // Call API to update task
    const updated = yield call(
      updateTaskApi,
      action.payload.id,
      action.payload.updates
    );

    // Update Redux store with updated task
    yield put({ type: types.TASK_UPDATE_STATUS_SUCCESS, payload: updated });

    // Refresh stats automatically
    yield put(fetchStats());
  } catch (error) {
    yield put({
      type: types.TASK_UPDATE_STATUS_FAILURE,
      payload: error.message,
    });
  }
}

// --- Delete task saga ---
function* deleteTaskSaga(action) {
  try {
    yield call(deleteTaskApi, action.payload);
    yield put({ type: types.TASK_DELETE_SUCCESS, payload: action.payload });
    yield put(fetchStats());
  } catch (error) {
    yield put({ type: types.TASK_DELETE_FAILURE, payload: error.message });
  }
}

// --- Root saga for tasks ---
export default function* taskSagas() {
  yield takeLatest(types.TASK_FETCH_REQUEST, fetchTasksSaga);
  yield takeLatest(types.TASK_CREATE_REQUEST, createTaskSaga);
  yield takeLatest(types.TASK_UPDATE_STATUS_REQUEST, updateTaskSaga);
  yield takeLatest(types.TASK_DELETE_REQUEST, deleteTaskSaga);
}
