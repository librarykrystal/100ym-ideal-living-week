import React, { useState, useEffect } from "react";
import "./weekpage.css";
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
function WeekPage() {
  // const [activities, setActivities] = useState([]);
  const dispatch = useDispatch();
  const activities = useSelector((store) => store.activities);

  const handleAddActivity = (activity) => {
    const start = new Date(`1970-01-01T${activity.start_time}:00.000Z`);
    const end = new Date(`1970-01-01T${activity.end_time}:00.000Z`);
    const timeDiff = ((end - start) / (1000 * 60 * 60)).toFixed(2);
    const activityWithTime = { ...activity, total_hours: timeDiff };
    dispatch({ type: "POST_ACTIVITY", payload: activityWithTime });
  };

  // dispatch({ type: "POST_ACTIVITY", payload: activity });
  // setActivities([...activities, activity]);

  useEffect(() => {
    dispatch({ type: "FETCH_ACTIVITIES" });
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <center>
        <Typography variant="h4" mt={0} mb={1} gutterBottom>
          Weekly Planner
        </Typography>
      </center>
      <AddActivityForm
        onAddActivity={handleAddActivity}
        activities={activities}
        daysOfWeek={daysOfWeek}
      />

      <br />
      <br />
      <Stack direction="row" spacing={2}>
        {daysOfWeek.map((day) => (
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <center>
                <Typography variant="h6">{day}</Typography>
              </center>
              <ul>
                {activities
                  .filter((activity) => activity.day === day)
                  .map((activity) => (
                    <li key={activity.id}>
                      <Typography>{activity.category_name}</Typography>
                      <Typography>
                        {activity.start_time} - {activity.end_time}
                      </Typography>
                    </li>
                  ))}
              </ul>
            </FormControl>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}

function AddActivityForm({ onAddActivity, activities, daysOfWeek }) {
  const [activity, setActivity] = useState({
    category_id: 0,
    day: "",
    start_time: "",
    end_time: "",
    total_hours: "",
  });
  const [overlapError, setOverlapError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

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

      <br />
      <FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Activity
        </Button>
      </FormControl>
    </form>
  );
}
export default WeekPage;
