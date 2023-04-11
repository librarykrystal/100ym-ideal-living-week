import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchUserList() {
  try {
    const userList = yield axios.get('/api/userlist', config);
    console.log('get USERLIST result:', userList.data);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USERLIST', payload: inventory.data });
  } catch (error) {
    console.log('ERROR GETTING USER LIST:', error);
  }
}

function* userListSaga() {
  yield takeLatest('FETCH_USERLIST', fetchUserList);
}

export default userListSaga;
