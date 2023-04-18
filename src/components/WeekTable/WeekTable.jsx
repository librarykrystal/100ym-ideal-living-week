import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "@fontsource/roboto-slab";
import prioritiesSaga from "../../redux/sagas/priorities.saga";

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

// function createData(
//   Categories,
//   Monday,
//   Tuesday,
//   Wednesday,
//   Thursday,
//   Friday,
//   Saturday,
//   Sunday,
//   Total
// ) {
//   return {
//     Categories,
//     Monday,
//     Tuesday,
//     Wednesday,
//     Thursday,
//     Friday,
//     Saturday,
//     Sunday,
//     Total,
//   };
// }

export default function BasicTable() {
  const dispatch = useDispatch();
  const activities = useSelector((store) => store.activities);
  const categories = useSelector((store) => store.categories);
  const priorities = useSelector((store) => store.priorities);

  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVITIES" });
    dispatch({ type: "FETCH_CATEGORIES" });
    dispatch({ type: "FETCH_PRIORITIES" });
  }, []);

  console.log("activities", activities);
  console.log("categories", categories);
  console.log("priorities", priorities);

  const categoriesAlpha = categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  console.log("categoriesSorted", categoriesAlpha);

  // const categoriesPrioritized = priorities

  const activitiesSorted = activities.sort((a, b) =>
    a.start_time.localeCompare(b.start_time)
  );

  console.log("activitiesSorted", activitiesSorted);

  const categoriesAlphaWthActvts = categoriesAlpha.map((category) => {
    category.activities = activitiesSorted.filter(
      ({ category_name }) => category_name === category.name
    );
    return category;
  });

  console.log("categoriesWithActivities", categoriesAlphaWthActvts);

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Categories</TableCell>
              <TableCell align="right">Monday</TableCell>
              <TableCell align="right">Tuesday</TableCell>
              <TableCell align="right">Wednesday</TableCell>
              <TableCell align="right">Thursday</TableCell>
              <TableCell align="right">Friday</TableCell>
              <TableCell align="right">Saturday</TableCell>
              <TableCell align="right">Sunday</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesAlphaWthActvts.map(({ id, name, activities }) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">
                  {activities
                    .filter((activity) => activity.day === "Monday")
                    .map((activity) => parseFloat(activity.total_hours))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {activities
                    .filter((activity) => activity.day === "Tuesday")
                    .map((activity) => parseFloat(activity.total_hours))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {activities
                    .filter((activity) => activity.day === "Wednesday")
                    .map((activity) => parseFloat(activity.total_hours))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {activities
                    .filter((activity) => activity.day === "Thursday")
                    .map((activity) => parseFloat(activity.total_hours))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {activities
                    .filter((activity) => activity.day === "Friday")
                    .map((activity) => parseFloat(activity.total_hours))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {activities
                    .filter((activity) => activity.day === "Saturday")
                    .map((activity) => parseFloat(activity.total_hours))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {activities
                    .filter((activity) => activity.day === "Sunday")
                    .map((activity) => parseFloat(activity.total_hours))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {activities
                    .map((activity) => parseFloat(activity.total_hours))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )
                    .toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
