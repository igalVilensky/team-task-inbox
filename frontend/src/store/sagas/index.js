import { all, fork } from "redux-saga/effects";
import taskSaga from "./taskSaga";
import statsSaga from "./statsSaga";
import systemSaga from "./systemSaga";

export default function* rootSaga() {
  yield all([fork(taskSaga), fork(statsSaga), fork(systemSaga)]);
}
