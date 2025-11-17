import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "../actions/taskTypes";
import { fetchTasksApi, updateTaskApi } from "../../api/taskApi";
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

// --- Root saga for tasks ---
export default function* taskSagas() {
  yield takeLatest(types.TASK_FETCH_REQUEST, fetchTasksSaga);
  yield takeLatest(types.TASK_UPDATE_STATUS_REQUEST, updateTaskSaga);
}
