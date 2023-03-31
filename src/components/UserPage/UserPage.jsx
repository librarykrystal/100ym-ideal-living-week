import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
//we will need some copy here "welcome to your ideal week, to begin please go to the reflection
//space to journal on the most important aspects of healthful living" -
//we will then need a button to direct to the questionnaire

//Once the user has created their ideal week we will need a GET route
//to the ideal-week table to display the data in a grid

//Route needed: GET to ideal-week
function UserPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

export default UserPage;
