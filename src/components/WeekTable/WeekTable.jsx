import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  Categories,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
  Total
) {
  return {
    Categories,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
    Total,
  };
}

const rows = [
  createData("Sleep", 8.0, 7.5, 8.5, 9.0, 8.0, 9.5, 9.0, 59.5),
  createData("Wellness", 1.0, 2.0, 3.5, 4.5, 2.5, 3.5, 2.5, 19.5),
  createData("Outdoor Time", 4.0, 2.5, 3.0, 1.5, 2.0, 2.5, 3.0, 18.5),
  createData("Family Time", 3.0, 3.5, 4.0, 4.5, 5.0, 4.0, 5.0, 29),
  createData("Eating", 2.0, 3.0, 3.5, 2.5, 3.5, 3.0, 3.5, 21),
];

const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];


export default function BasicTable() {
    const dispatch = useDispatch();
    const activities = useSelector((store) => store.activities);
    const categories = useSelector((store) => store.categories);

    useEffect(() => {
        dispatch({ type: "FETCH_ACTIVITIES" });
        dispatch({ type: "FETCH_CATEGORIES" });
      }, []);

      console.log('activities', activities);
      console.log('categories', categories);
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Categories</TableCell>
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
          {rows.map((row) => (
            <TableRow
              key={row.Categories}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Categories}
              </TableCell>
              <TableCell align="right">{row.Monday}</TableCell>
              <TableCell align="right">{row.Tuesday}</TableCell>
              <TableCell align="right">{row.Wednesday}</TableCell>
              <TableCell align="right">{row.Thursday}</TableCell>
              <TableCell align="right">{row.Friday}</TableCell>
              <TableCell align="right">{row.Saturday}</TableCell>
              <TableCell align="right">{row.Sunday}</TableCell>
              <TableCell align="right">{row.Total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
