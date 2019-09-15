import { takeEvery, put } from "redux-saga/effects";

function* workerSaga() {
  console.log("hey from worker");
  console.log(put({ type: "ACTION_FROM_WORKER" }));
  yield put({ type: "ACTION_FROM_WORKER" });
}

//Watcher saga
function* rootSaga() {
  yield takeEvery("HELLO", workerSaga);
  console.log("Sagaaaaa!");
}

export default rootSaga;
