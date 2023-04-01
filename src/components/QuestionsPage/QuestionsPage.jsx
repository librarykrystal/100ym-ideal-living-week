import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Needs to GET questions, categories, and any previous answers from current user

// Drop down lets user select a category, and this selection is used to filter which q's show
// since the user is not leaving the page, they can hop between categories all they want
// without losing any unsaved answers

// Needs text field paired with each question
// text fields will require onChange which dispatches to redux store, which makes POST request

// BUTTONS: save, save & continue, save & go home
// STRETCH GOAL BUTTON: discard changes (would reset local state to match database)


function QuestionsPage() {

  const user = useSelector((store) => store.user);
  const questions = useSelector(store => store.questions);
  const categories = useSelector(store => store.categories);
  const answers = useSelector(store => store.answers);
  const history = useHistory();
  const dispatch = useDispatch();

  // this will be assigned the category selected by the user from a drop-down list
  // and then used by categoryFilterHandler function to filter the questions
  const [categoryFilter, setCategoryFilter] = useState('');

  // ???  
  // TO DO: local state variable for EACH answer?  30 of them???  Something lke this:
  const [answer1, setAnswer1] = useState(answers[1]);   // where 1 references the question_id
  // ...


  // Dispatches (on page load) to GET all the questions and GET the list of unordered categories
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_CATEGORIES' });
    dispatch({ type: 'FETCH_ALL_QUESTIONS' });
  }, []);

  // Handles filtering to show only questions from the user-selected category
  const categoryFilterHandler = (item) => {
    if (!categoryFilter) {
      return item;
    } else if (item.category == categoryFilter) {
      return item;
    }
  }


  return (
    <div className="container">
      <div>
        <p>QUESTIONS PAGE</p>
      </div>
    </div>
  );
}

export default QuestionsPage;
