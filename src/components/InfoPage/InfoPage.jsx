import React from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
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
const saveAndContinue = () => {
  console.log('SAVE & CONTINUE clicked');
  dispatch({
      type: 'POST_ANSWERS',
      payload: answers
    });
  
}


  return (
    <div className="container">
     
      <p>Info Page</p>
      <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={saveAndContinue}>SAVE and CONTINUE
          </Button>
    </div>
  );
}

export default InfoPage;
