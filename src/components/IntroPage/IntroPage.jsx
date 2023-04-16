import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


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

function IntroPage() {
  const dispatch = useDispatch();
const answers = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
  10: '',
  11: '',
  12: '',
  13: '',
  14: '',
  15: '',
  16: '',
  17: '',
  18: '',
  19: '',
  20: '',
  21: '',
  22: '',
  23: '',
  24: '',
  25: '',
  26: '',
  27: '',
  28: '',
  29: '',
  30: ''

}
const postAndContinue = () => {
  console.log('SAVE & CONTINUE clicked');
  dispatch({
      type: 'POST_ANSWERS',
      payload: answers
    });
    dispatch({
      type: 'INTRO_PAGE_DONE'
    });
}

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
      <Typography variant="h4" mt={0} mb={4} gutterBottom>Welcome!</Typography>
        <Typography variant="body1" mb={9}>Intro text goes here.</Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          onClick={postAndContinue}>NEXT
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default IntroPage;
