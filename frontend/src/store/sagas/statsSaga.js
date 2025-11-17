import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "../actions/statsTypes";
import { fetchStatsApi } from "../../api/statsApi";

function* fetchStatsSaga() {
  try {
    const data = yield call(fetchStatsApi);
    yield put({ type: types.STATS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.STATS_FETCH_FAILURE, payload: error.message });
  }
}

export default function* statsSagas() {
  yield takeLatest(types.STATS_FETCH_REQUEST, fetchStatsSaga);
}
