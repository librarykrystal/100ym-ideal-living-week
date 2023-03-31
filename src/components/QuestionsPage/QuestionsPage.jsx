import React from "react";

//This page requires a dispatch to retrieve the unranked categories (sends to a reducer which sends to a saga, which makes a GET request),
//and their associated  questions. I think it might be wise to consider modifying the
//DB slightly so that the questions are connected to the categories
//This page will need save your progress buttons underneath each set of questions,
//and text fields for the user to answer the questions.

//another potential solution is to just hardcode the categories, to simplify, and then GET the questions

//the text fields will require an onChange which sends to the redux store blah blah blah, makes a POST request

//Required Routes -
//GET questions POST answers
function QuestionsPage() {
  return (
    <div className="container">
      <div>
        <p>QUESTIONS PAGE</p>
      </div>
    </div>
  );
}

export default QuestionsPage;
