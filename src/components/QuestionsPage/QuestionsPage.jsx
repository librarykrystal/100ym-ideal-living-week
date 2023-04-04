import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function QuestionsPage() {

  // TEMPORARY questions to use for building .map, until router is available
  const questions = [
    {id: 1, category: 'Sleep', question_text: 'Question id 1, (category: Sleep)'},
    {id: 2, category: 'Sleep', question_text: 'Question id 2, (category: Sleep)'},
    {id: 3, category: 'Work', question_text: 'Question id 3, (category: Work)'},
    {id: 4, category: 'Self-Care', question_text: 'Question id 4, (category: Self-Care)'}
  ];

  const categories = ['Sleep', 'Self-Care', 'Family and Relationships', 'Personal Development', 'Nutrition', 'Leisure Time', 'Community Involvement', 'Creativity', 'Work', 'Measure What Matters'];

  // const user = useSelector((store) => store.user);
  // const questions = useSelector(store => store.questions);
  // const categories = useSelector(store => store.categories);
  // const storeAnswers = useSelector(store => store.answers);
  const history = useHistory();
  const dispatch = useDispatch();

  // this is be assigned the user-selected category from drop-down and used to filter questions:
  const [categoryFilter, setCategoryFilter] = useState('');

  // Getter/setter hook for holding local state of all 30 user answers:
  const [stateAnswers, setStateAnswers] = useState({
    q1A: 'DB entry for Q1.', q2A: '', q3A: '',
    q4A: '', q5A: '', q6A: '',
    q7A: '', q8A: '', q9A: '',
    q10A: '', q11A: '', q12A: '',
    q13A: '', q14A: '', q15A: '',
    q16A: '', q17A: '', q18A: '',
    q19A: '', q20A: '', q21A: '',
    q22A: '', q23A: '', q24A: '',
    q25A: '', q26A: '', q27A: '',
    q28A: '', q29A: '', q30A: ''
  });

  // Dispatches (on page load) to GET all the questions and GET the list of unordered categories
  useEffect(() => {
    // dispatch({ type: 'FETCH_CATEGORIES' });
    // dispatch({ type: 'FETCH_QUESTIONS' });
  }, []);

  // Handles filtering to show only questions from the user-selected category
  const categoryFilterHandler = (item) => {
    if (!categoryFilter) {
      return;
    } else if (item.category == categoryFilter) {
      return item;
    }
  }

  // handles changes to answers being set in local state object
  const handleAnswerChange = (id, value) => {
    const key = `q${id}A`
    setStateAnswers({
      ...stateAnswers,
      [key]: value
    });
  };

  // Handles SAVE - - - submits ALL answers/changes to database at once
  const saveAnswers = () => {
    console.log('SAVE clicked');
    dispatch({
        type: 'SET_ANSWERS',
        payload: stateAnswers
      });
  }

  // Handles SAVE & CONTINUE - - - submits all answers AND routes to PRIORITIZAION
  const saveAndContinue = () => {
    console.log('SAVE & CONTINUE clicked');
    dispatch({
        type: 'SET_ANSWERS',
        payload: stateAnswers
      });
    history.push(`/prioritize`);
  }

    // Handles SAVE & GO HOME - - - submits all answers AND routes to HOME (for EDITING page)
    const saveAndGoHome = () => {
      console.log('SAVE & CONTINUE clicked');
      dispatch({
        type: 'SET_ANSWERS',
        payload: stateAnswers
      });
    history.push(`/home`);
  }
  

  return (
    <div className="container">
      <div>

        {/* DOM READ-OUTS for TESTING */}
        {/* <p>Q1 RESPONSE: {stateAnswers.q1A}</p> */}
        {/* <p>Q2 RESPONSE: {stateAnswers.q2A}</p> */}
        <p>QUESTIONS TEST: {JSON.stringify(questions)}</p>
        <br/>
        <p>CATEGORIES TEST: {JSON.stringify(categories)}</p>
        {/* <br/> */}

        <center>
        <h3>QUESTIONS PAGE</h3>

        <p>Intro goes here, if there is one.</p>
        <br/>
        </center>

        {/* DROPDOWN input for FILTERING by CATEGORY — temporarily hardcoded */}
        <FormControl fullWidth>
          <InputLabel id="category">Category</InputLabel>
          <Select
            sx={{width: "300px"}}
            labelId="category"
            id="category"
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat, index) =>
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <br/><br/>


        {/* Loop through questions, showing those which match category */}
        <div className="questionsTrioContainer">
          {questions.length > 0 &&
            <div>
              {categoryFilter ?
                <div>
                  {questions
                    .filter(categoryFilterHandler)
                    .map(item => {
                      return (
                        <div key={item.id}>
                          <div className="qAndAContainer">
                            <p>{item.question_text}</p>
                            <TextField
                              id="answer"
                              label="Your Response"
                              fullWidth multiline rows={3}
                              variant="outlined"
                              value={stateAnswers[`q${item.id}A`]}
                              onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                            />
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              :
                <p>Please select a category to view questions.</p>
              }
            </div>
          }
        </div>
        <br /><br />

        <center>
          {/* SAVE button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={saveAnswers}>SAVE CHANGES
          </Button>
          <br/><br/>

          {/* SAVE & GO PRIORITIZE button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={saveAndContinue}>SAVE and CONTINUE
          </Button>

          {/* BRAINSTORM: SAVE & GO HOME button - ? - 
          conditional render, only visible if this is acting as the go-back-and-edit page */}

        </center>

      </div>
    </div>
  );
}

export default QuestionsPage;
