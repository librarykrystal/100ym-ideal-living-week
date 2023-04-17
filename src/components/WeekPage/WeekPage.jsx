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
import AddActivityForm from "../AddActivityForm/AddActivityForm";
import ActivityModal from "../ActivityModal/ActivityModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

function WeekPage() {
  // const [activities, setActivities] = useState([]);
  const dispatch = useDispatch();
  const activities = useSelector((store) => store.activities);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({});

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedActivity({});
    setModalOpen(false);
  };
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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <ThemeProvider theme={theme}>
      <div>
        <center>
          <Typography variant="h4" mt={0} mb={1} gutterBottom>
            Your Ideal Week
          </Typography>
        </center>

        <center>
          <div>
            <AddActivityForm
              onAddActivity={handleAddActivity}
              activities={activities}
              daysOfWeek={daysOfWeek}
            />
          </div>
        </center>
        <br />
        <br />
        <Stack direction="row" spacing={2}>
          {daysOfWeek.map((day) => (
            <Stack key={day} direction="row" spacing={2}>
              <FormControl fullWidth>
                <center>
                  <Typography variant="h6">{day}</Typography>
                </center>
                <ul>
                  {activities
                    .filter((activity) => activity.day === day)
                    .map((activity) => {
                      const start = new Date(
                        `1971-01-01T${activity.start_time}-06:00`
                      );

                      const end = new Date(
                        `1970-01-01T${activity.end_time}-06:00`
                      );
                      const startTime = start.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      });
                      const endTime = end.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      });
                      return (
                        <li
                          key={activity.id}
                          onClick={() => handleActivityClick(activity)}
                        >
                          <Typography>{activity.category_name}</Typography>
                          <Typography>
                            {startTime} - {endTime}
                          </Typography>
                          <div
                            style={{ height: `${activity.total_hours * 20}px` }}
                          ></div>
                        </li>
                      );
                    })}
                </ul>

                <ActivityModal
                  activities={activities}
                  activity={selectedActivity}
                  open={modalOpen}
                  onClose={handleCloseModal}
                />
              </FormControl>
            </Stack>
          ))}
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default WeekPage;
