import React from "react";
import WeekTable from "../WeekTable/WeekTable";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto-slab";

// Material UI Font Theming
const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Slab"],
  },
  palette: {
    primary: {
      main: "#475473",
    },
    secondary: {
      main: "#1c4bd9",
    },
    info: {
      main: "#bdbfbf",
    },
  },
});

//we will need some copy here "welcome to your ideal week, to begin please go to the reflection
//space to journal on the most important aspects of healthful living" -
//we will then need a button to direct to the questionnaire

//Once the user has created their ideal week we will need a GET route
//to the ideal-week table to display the data in a grid

//Route needed: GET to ideal-week
function UserPage() {
  const user = useSelector((store) => store.user);
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Typography variant="h6" mb={3}>Welcome, {user.username}!</Typography>
        <WeekTable />
      </div>
    </ThemeProvider>
  );
}

export default UserPage;
