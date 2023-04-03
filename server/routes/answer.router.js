const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();







router.post('/', (req, res) => {
    const userId = req.user.id;
    entry = req.body;
    
    const sqlText = `INSERT INTO "answer" ("user_id", "question_id", "response") 
                     VALUES ($1, $2, $3)
                     RETURNING "id";`;
    const sqlParams = [entry.user_id, entry.question_id, entry.response];
    
    pool.query(sqlText, sqlParams)
      .then(result => {
        console.log(`Added answer to the database`, result.rows[0].id);
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
      })
  });
  
  module.exports = router;