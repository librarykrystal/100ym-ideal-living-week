import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// Need to GET questions, categories, and any previous answers from current user

// Drop down lets user select a category, and this selection is used to filter which q's show
// since the user is not leaving the page, they can hop between categories all they want
// without losing any unsaved answers

// Need to have text field paired with each question
// text fields will require onChange which dispatches to redux store, which makes POST request

// BUTTONS: save, save & continue, save & go home
// STRETCH GOAL BUTTON: discard changes (would reset local state to match database)

// QUESTION: is this both the initial setup page AND the editing page?


function QuestionsPage() {

  // const user = useSelector((store) => store.user);
  // const questions = useSelector(store => store.questions);
  // const categories = useSelector(store => store.categories);
  // const answers = useSelector(store => store.answers);
  const history = useHistory();
  const dispatch = useDispatch();

  // when a selection is made, this flips to false and the initial message goes away
  const [noneChosen, setNoneChosen] = useState(true);

  // this will be assigned the category selected by the user from a drop-down list
  // and then used by categoryFilterHandler function to filter the questions
  const [categoryFilter, setCategoryFilter] = useState('');

  // ???  
  // TO DO: local state variable for EACH answer?  30 of them???  Something lke this:
  const [answer1, setAnswer1] = useState('');
  // or     const [answer1, setAnswer1] = useState(answers[1]);
  // where [1] matches the question_id ?
  // ...

  // Dispatches (on page load) to GET all the questions and GET the list of unordered categories
  useEffect(() => {
    // dispatch({ type: 'FETCH_CATEGORIES' });
    // dispatch({ type: 'FETCH_QUESTIONS' });
  }, []);

  // Handles filtering to show only questions from the user-selected category
  const categoryFilterHandler = (item) => {
    if (!categoryFilter) {
      setNoneChosen(false);
    } else if (item.category == categoryFilter) {
      return item;
    }
  }

  // Handles SAVE - - - submits ALL answers/changes to database at once
  const saveAnswers = () => {
    console.log('SAVE clicked');
    dispatch({
        type: 'SET_ANSWERS',
        // payload: TBD
      });
  }

  // Handles SAVE & CONTINUE - - - submits all changes AND routes to PRIORITIZAION
  const saveAndContinue = () => {
    console.log('SAVE & CONTINUE clicked');
    dispatch({
        type: 'SET_ANSWERS',
        // payload: TBD
      });
    history.push(`/prioritize`);
  }

    // Handles SAVE & GO HOME - - - submits all changes AND routes to HOME
    const saveAndGoHome = () => {
      console.log('SAVE & CONTINUE clicked');
      dispatch({
        type: 'SET_ANSWERS',
        // payload: TBD
      });
    history.push(`/home`);
  }


  return (
    <div className="container">
      <div>
        <p>QUESTIONS PAGE</p>

        {/* ADD: Instructions for user to browse questions belonging to various categories using drop-down */}


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
            {/* <MenuItem value="">All Types</MenuItem> */}
            <MenuItem value="Sleep">Sleep</MenuItem>
            <MenuItem value="Self-Care">Self-Care</MenuItem>
            <MenuItem value="Family and Relationships">Family and Relationships</MenuItem>
            <MenuItem value="Personal Development">Personal Development</MenuItem>
            <MenuItem value="Nutrition">Nutrition</MenuItem>
            <MenuItem value="Leisure Time">Leisure Time</MenuItem>
            <MenuItem value="Community Involvement">Community Involvement</MenuItem>
            <MenuItem value="Creativity">Creativity</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Measure What Matters">Measure What Matters</MenuItem>
          </Select>
        </FormControl>
        <br/><br/>

        {noneChosen == true &&
          <p>Please choose a category.</p>
        }

        {/* Loop through questions, showing those which match category */}

        



      
        {/* For each match, show question and text box with onChange that sets local state */}

            {/* can we do something like:
                setAnswer{item.question_id}(e.target.value)
                to, for instance, setAnswer1 with the answer to the question with id of 1? */}

        {/* SAVE button which triggers saveAnswers function */}
        {/* SAVE & CONTINUE button which triggers saveAndContinue function */}
        {/* SAVE & GO HOME button - only visible if setup process has been prev completed */}

      </div>
    </div>
  );
}

export default QuestionsPage;
