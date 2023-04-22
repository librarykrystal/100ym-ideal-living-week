import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import "@fontsource/roboto-slab";
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


function AdminPage() {

  const dispatch = useDispatch();
  const userList = useSelector(store => store.userList);

  // Dispatch (on page load) to GET all the users
  useEffect(() => {
    dispatch({ type: 'FETCH_USERLIST' });
  }, []);

  // Makes each view load scrolled to top
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <div>
        <Typography variant="h4" mt={0} mb={5} gutterBottom>ADMIN PAGE</Typography>
      </div>
      <Typography variant="h5" mt={0} mb={1} gutterBottom>USERS</Typography>
      <Box>
        {/* Conditional to avoid rendering before users array arrives from Redux store */}
        {userList.length > 0 &&
          <>
            {/* Looping over array of users */}
            {userList.map(person => {
              return(
              <div key={person.id}>
                <Typography variant="body1" mt={0} mb={0} gutterBottom>{person.username} — {person.email}</Typography>
              </div>
            )})}
          </>
        }
      </Box>
    </div>
    </ThemeProvider>
  );
}

export default AdminPage;