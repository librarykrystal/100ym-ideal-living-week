import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAnswers() {
  try {
    const answers = yield axios.get("/api/answer");
    console.log("get all answers:", answers.data);
    yield put({ type: "SET_ANSWERS", payload: answers.data });
  } catch {
    console.log("get all categories error");
  }
 }
 
// Allows user to create a post request when they input their answers
function* postAnswers(action) {
  try {
   
    yield axios.post('/api/answer', action.payload); 

  
  } catch (error) {
   console.log('Error with creating family:', error);
    yield put({ type: 'SET_ANSWERS' });
  };
};

function* answerSaga() {
    yield takeEvery('POST_ANSWERS', postAnswers); //will allow a dispatch from the register page
    yield takeEvery("FETCH_ANSWERS", fetchAnswers);
  };
  
  export default answerSaga;