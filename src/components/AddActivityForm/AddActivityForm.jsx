import React, { useState, useEffect } from "react";
// gi
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

function AddActivityForm({ onAddActivity, activities, daysOfWeek }) {
  const [activity, setActivity] = useState({
    category_id: 0,
    day: "",
    start_time: "",
    end_time: "",
    total_hours: "",
  });
  const [overlapError, setOverlapError] = useState(false);
  const [invalidTimeError, setInvalidTimeError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const start = new Date(`1970-01-01T${activity.start_time}:00.001Z`);
    const end = new Date(`1970-01-01T${activity.end_time}:00.001Z`);

    // Check if start time is before end time
    if (start >= end) {
      setInvalidTimeError(true);
      return;
    }

    const existingActivities = activities.filter(
      (a) =>
        a.day === activity.day &&
        a !== activity &&
        ((a.start_time >= activity.start_time &&
          a.start_time < activity.end_time) ||
          (activity.start_time >= a.start_time &&
            activity.start_time < a.end_time))
    );

    if (existingActivities.length > 0) {
      setOverlapError(true);
    } else {
      onAddActivity({ ...activity });
      setActivity({
        category_id: 0,
        day: "",
        start_time: "",
        end_time: "",
        total_hours: "",
      });
      setOverlapError(false);
      setInvalidTimeError(false);
    }
  };

  const handleChange = (event) => {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Add an Activity
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <Typography>Select Category</Typography>
            <Select
              name="category_id"
              value={activity.category_id}
              onChange={handleChange}
              // className={classes.input}
            >
              <MenuItem value={0}></MenuItem>
              <MenuItem value={1}>Sleep</MenuItem>
              <MenuItem value={2}>Self-Care</MenuItem>
              <MenuItem value={3}>Family and Relationships</MenuItem>
              <MenuItem value={4}>Personal Development</MenuItem>
              <MenuItem value={5}>Nutrition</MenuItem>
              <MenuItem value={6}>Leisure Time</MenuItem>
              <MenuItem value={7}>Community Involvement</MenuItem>
              <MenuItem value={8}>Creativity</MenuItem>
              <MenuItem value={9}>Work</MenuItem>
              <MenuItem value={10}>Measure What Matters</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <Typography>Select Day</Typography>
            <Select
              name="day"
              value={activity.day}
              onChange={handleChange}
              // label="Select Day"
              // className={classes.input}
            >
              <MenuItem value="0">Select Day</MenuItem>
              {daysOfWeek.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <Typography>Start Time</Typography>
            <TextField
              type="time"
              name="start_time"
              value={activity.start_time}
              onChange={handleChange}
              // className={classes.input}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <Typography>End Time</Typography>
            <TextField
              type="time"
              name="end_time"
              value={activity.end_time}
              onChange={handleChange}
              // className={classes.input}
            />
          </FormControl>
        </Grid>
      </Grid>
      {overlapError && (
        <Typography variant="body2">
          There is an overlap with another activity on this day and time.
        </Typography>
      )}
      {invalidTimeError && (
        <Typography color="error">
          Start time must be before end time
        </Typography>
      )}
      <br />
      <FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Activity
        </Button>
      </FormControl>
    </form>
  );
}
export default AddActivityForm;
