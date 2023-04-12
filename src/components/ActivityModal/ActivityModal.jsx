import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  //   const [activityData, setActivityData] = React.useState(activity);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // handle updating activity with formValues
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
      <Box sx={style}>
        <h2 id="modal-title">Edit Activity</h2>
        <TextField
          name="activityName"
          label="Activity Name"
          defaultValue={activity.category_name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          name="startTime"
          label="Start Time"
          type="time"
          defaultValue={activity.start_time}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          name="endTime"
          label="End Time"
          type="time"
          defaultValue={activity.end_time}
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
    </Modal>
  );
};

export default ActivityModal;
