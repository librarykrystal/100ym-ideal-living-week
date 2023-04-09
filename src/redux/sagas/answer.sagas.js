import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// Allows user to create a post request when they input their answers
function* postAnswer(action) {
  try {
   
    yield axios.post('/api/answer', action.payload); 

  
  } catch (error) {
   console.log('Error with creating family:', error);
    yield put({ type: 'SET_ANSWERS' });
  };
};

function* answerSaga() {
    yield takeEvery('POST_ANSWER', postAnswer); //will allow a dispatch from the register page
  
  };
  
  export default answersSaga;