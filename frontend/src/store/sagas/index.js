import { all, fork } from "redux-saga/effects";
import taskSaga from "./taskSaga";
import statsSaga from "./statsSaga";

export default function* rootSaga() {
  yield all([fork(taskSaga), fork(statsSaga)]);
}
