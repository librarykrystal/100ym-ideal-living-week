import React from "react";
import WeekTable from "../WeekTable/WeekTable";
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
