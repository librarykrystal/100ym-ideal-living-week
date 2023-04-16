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
function* updatePriorities(action) {
    console.log("put priorities sagas action payload", action.payload)
    try {
        const allPriorities = action.payload;
        for(let priority of allPriorities) {
          yield axios.put('/api/priority', priority);
       }
        yield put({ type: 'FETCH_PRIORITIES' });
    } catch (error) {
        console.log('Error with creating priorities:', error);
    };
}
function* prioritiesSaga() {
    yield takeEvery("FETCH_PRIORITIES", fetchPriorities);
    yield takeEvery("UPDATE_PRIORITIES", updatePriorities);
};
export default prioritiesSaga;