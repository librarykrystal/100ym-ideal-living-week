import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import "@fontsource/roboto-slab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

// Material UI Font Theming
const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Slab',
    ],
  },
  palette: {
    primary: {
      main: '#475473',
    },
    secondary: {
      main: '#1c4bd9',
    },
    info: {
      main: '#bdbfbf',
    },
  },
});

function QuestionsPage() {
  // const user = useSelector((store) => store.user);
  const questions = useSelector((store) => store.questions);
  const answers = useSelector((store) => store.answers);
  const categories = useSelector((store) => store.categories);
  const history = useHistory();
  const dispatch = useDispatch();

  // this is be assigned the user-selected category from drop-down and used to filter questions:
  const [categoryFilter, setCategoryFilter] = useState("");

  console.log("#1 answer:", answers);
  // console.log('#2 answer:', stateAnswers.q2A);

  // Dispatch (on page load) to GET all the questions
  // (Categories are fetched in app.jsx)
  useEffect(() => {
    dispatch({ type: "FETCH_QUESTIONS" });
    dispatch({ type: "FETCH_ANSWERS" });
  }, []);

  // Handles filtering to show only questions from the user-selected category
  const categoryFilterHandler = (item) => {
    if (!categoryFilter) {
      return;
    } else if (item.category_id == categoryFilter) {
      return item;
    }
  };

  // handles changes to answers being set in local state object
  const handleAnswerChange = (id, value) => {
    const key = `${id}`;
    dispatch({
      type: "UPDATE_SINGLE_ANSWER",
      payload: {
        key,
        value,
      },
    });
  };

  // Handles SAVE - - - submits ALL answers/changes to database at once
  const saveAnswers = () => {
    console.log("SAVE clicked");
    dispatch({
      type: "SET_ANSWERS",
      payload: answers,
    });
  };

  // Handles SAVE & CONTINUE - - - submits all answers AND routes to PRIORITIZAION
  const saveAndContinue = () => {
    console.log("SAVE & CONTINUE clicked");
    dispatch({
      type: "POST_ANSWERS",
      payload: answers,
    });
    history.push(`/priorities`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div>
          <center>
            <Typography variant="h4" mt={0} mb={1} gutterBottom>
              QUESTIONS PAGE
            </Typography>
            <Typography variant="body1" mb={9} gutterBottom>
              Intro goes here, if there is one.
            </Typography>
          </center>

          {/* DROPDOWN input for FILTERING by CATEGORY — temporarily hardcoded */}
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              sx={{ width: "300px" }}
              labelId="category"
              id="category"
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />

          {/* Loop through questions, showing those which match category */}
          <div className="questionsTrioContainer">
            {questions.length > 0 && (
              <div>
                {categoryFilter ? (
                  <div>
                    {questions.filter(categoryFilterHandler).map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="qAndAContainer">
                            <p>{item.question_text}</p>
                            <TextField
                              id="answer"
                              label="Your Response"
                              fullWidth
                              multiline
                              rows={3}
                              variant="outlined"
                              value={answers[`${item.id}`]}
                              onChange={(e) =>
                                handleAnswerChange(item.id, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    Please select a category to view questions.
                  </Typography>
                )}
              </div>
            )}
          </div>
          <br />
          <br />

          {/* SAVE button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={saveAnswers}
          >
            SAVE PROGRESS
          </Button>
          <br />
          <br />

          {/* SAVE & NEXT button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={saveAndContinue}
          >
            SAVE and CONTINUE
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default QuestionsPage;