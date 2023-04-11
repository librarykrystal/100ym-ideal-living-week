import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import "@fontsource/roboto-slab";
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


function AdminPage() {

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <div>
        <Typography variant="h4" mt={0} mb={1} gutterBottom>ADMIN PAGE</Typography>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default AdminPage;