import { take, fork, call, put } from "redux-saga/effects";
import { IMAGES } from "../constants";

import { fetchImagesStats } from "../api";
import {
  loadImagesStats,
  setImagesStats,
  setImagesStatsError
} from "../actions";

function* handleStatsRequest(id) {
  for (let i = 0; i < 3; i++) {
    try {
      yield put(loadImagesStats(id));
      const res = yield call(fetchImagesStats, id);
      yield put(setImagesStats(id, res.downloads.total));
      return true;
    } catch (error) {}
  }

  yield put(setImagesStatsError(id));
}

export default function* watchStatsRequest() {
  while (true) {
    const { images } = yield take(IMAGES.LOAD_SUCCESS);

    for (let i = 0; i < images.length; i++) {
      yield fork(handleStatsRequest, images[i].id);
    }
  }
}
