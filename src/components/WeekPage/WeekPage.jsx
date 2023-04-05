import React, { useState, useEffect } from "react";
import "./weekpage.css";
import { useDispatch, useSelector } from "react-redux";

function WeekPage() {
  // const [activities, setActivities] = useState([]);
  const dispatch = useDispatch();
  const activities = useSelector((store) => store.activities);

  const handleAddActivity = (activity) => {
    dispatch({ type: "POST_ACTIVITY", payload: activity });
    // setActivities([...activities, activity]);
  };
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
    <div className="weekApp">
      <h1>Weekly Planner</h1>
      <div className="wgrid-container">
        {daysOfWeek.map((day) => (
          <div key={day} className="wgrid-item">
            <h2>{day}</h2>
            <ul>
              {activities
                .filter((activity) => activity.day === day)
                .map((activity) => (
                  <li key={activity.id}>
                    <span>{activity.category_name}</span>
                    <span>
                      {activity.start_time} - {activity.end_time}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <AddActivityForm
        onAddActivity={handleAddActivity}
        activities={activities}
      />
    </div>
  );
}

function AddActivityForm({ onAddActivity, activities }) {
  const [activity, setActivity] = useState({
    category_id: 0,
    day: "",
    start_time: "",
    end_time: "",
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
      setActivity({ category_id: 0, day: "", start_time: "", end_time: "" });
      setOverlapError(false);
    }
  };

  const handleChange = (event) => {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };

  return (
    <form className="weekForm" onSubmit={handleSubmit}>
      <label>
        Activity Name:
        <input
          type="number"
          name="category_id"
          value={activity.category_id}
          onChange={handleChange}
        />
      </label>
      <label>
        Day of Week:
        <select name="day" value={activity.day} onChange={handleChange}>
          <option value=""></option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </label>
      <label>
        Start Time:
        <input
          type="time"
          name="start_time"
          value={activity.start_time}
          onChange={handleChange}
        />
      </label>
      <label>
        End Time:
        <input
          type="time"
          name="end_time"
          value={activity.end_time}
          onChange={handleChange}
        />
      </label>
      {overlapError && (
        <div className="error">
          There is an overlap in scheduling. Please adjust the times and try
          again.
        </div>
      )}
      <button type="submit">Add Activity</button>
    </form>
  );
}

export default WeekPage;
