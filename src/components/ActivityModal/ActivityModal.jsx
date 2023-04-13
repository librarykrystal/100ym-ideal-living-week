import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 2,
};

const ActivityModal = ({ activity, open, onClose }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    // activityName: "",
    start_time: "",
    end_time: "",
    category_id: "",
    day: "",
  });
  const [modifiedFields, setModifiedFields] = useState({
    start_time: false,
    end_time: false,
  });

  useEffect(() => {
    if (activity) {
      setFormValues({
        day: activity?.day || "",
        // activityName: activity?.category_name || "",
        start_time: activity?.start_time || "",
        end_time: activity?.end_time || "",
        category_id: activity?.category_id || "",
      });
    }
  }, [activity]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (name === "start_time" || name === "end_time") {
      setModifiedFields((prevFields) => ({
        ...prevFields,
        [name]: true,
      }));
    } else {
      setModifiedFields((prevFields) => ({
        ...prevFields,
        [name]: false,
      }));
    }
  };

  const handleUpdate = () => {
    const start = new Date(`1970-01-01T${formValues.start_time}:00.001Z`);
    const end = new Date(`1970-01-01T${formValues.end_time}:00.001Z`);
    const modifiedStart = modifiedFields.start_time;
    const modifiedEnd = modifiedFields.end_time;

    let total_hours;

    if (modifiedStart && modifiedEnd) {
      total_hours = ((end - start) / (1000 * 60 * 60)).toFixed(2);
    } else if (modifiedStart) {
      const originalEnd = new Date(`1970-01-01T${activity.end_time}.001Z`);
      console.log("this is original end", originalEnd);
      total_hours = ((originalEnd - start) / (1000 * 60 * 60)).toFixed(2);
    } else if (modifiedEnd) {
      const originalStart = new Date(`1970-01-01T${activity.start_time}.001Z`);
      console.log("this is original start", originalStart);
      total_hours = ((end - originalStart) / (1000 * 60 * 60)).toFixed(2);
      console.log(end - originalStart);
    } else {
      total_hours = activity.total_hours;
    }
    console.log("this is start", start);
    console.log("this is end", end);

    const updatedActivity = {
      ...formValues,
      id: activity.id,
      total_hours,
    };
    dispatch({ type: "UPDATE_ACTIVITY", payload: updatedActivity });

    setModifiedFields({
      start_time: false,
      end_time: false,
    });
    onClose();
  };

  const handleDelete = () => {
    // handle deleting activity
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {activity && (
        <Box sx={style}>
          <h2 id="modal-title">Edit Activity</h2>
          <FormControl fullWidth>
            <Typography>Select Category</Typography>
            <Select
              name="category_id"
              value={formValues.category_id}
              onChange={handleChange}
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
          {/* <TextField
            name="activityName"
            value={formValues.activityName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          /> */}
          <TextField
            name="start_time"
            type="time"
            value={formValues.start_time}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="end_time"
            type="time"
            value={formValues.end_time}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </Box>
      )}
    </Modal>
  );
};

export default ActivityModal;
