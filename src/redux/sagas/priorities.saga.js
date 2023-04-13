import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPriorities() {
  try {
    const priority = yield axios.get("/api/priority");
    console.log("get all answers:", priority.data);
    yield put({ type: "SET_PRIORITIES", payload: priority.data });
  } catch {
    console.log("get all priortiy error");
  }
 }

 function* prioritiesSaga() {
  yield takeEvery("FETCH_PRIORITIES", fetchPriorities);
};



 export default prioritiesSaga;