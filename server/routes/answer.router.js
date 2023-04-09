const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `SELECT * FROM "answer" WHERE "user_id" = $1`;
    const sqlParams = [req.user.id];
  
    pool.query(query, sqlParams)
      .then(result => {
        res.send(result.rows);
      })
      .catch(error => {
        console.log(`Error making database query ${query}`, error);
        res.sendStatus(500);
      })
  });
  
// post still in works
// router.post('/', (req, res) => {
//     const userId = req.user.id;
//     entry = req.body;
    
//     const sqlText = `INSERT INTO "answer" ("user_id", "question_id", "response") 
//                      VALUES ($1, $2, $3)
//                      RETURNING "id";`;
//     const sqlParams = [userId, entry.question_id, entry.response];
    
//     pool.query(sqlText, sqlParams)
//       .then(result => {
//         console.log(`Added answer to the database`, result.rows[0].id);
//         res.sendStatus(201);
//       })
//       .catch(error => {
//         console.log(`Error making database query ${sqlText}`, error);
//         res.sendStatus(500);
//       })
//   });

router.post('/', (req, res) => {
    const userId = req.user.id
    const answers = req.body.answers;
  
    // Loop through the answers and insert them into the database
    Promise.all(
      answers.map(answer => {
        const sqlParams = [userId, answer.question_id, answer.response];
        const sqlText = `INSERT INTO "answer" ("user_id", "question_id", "response") VALUES ($1, $2, $3) RETURNING "id";`
        return pool.query(sqlText, sqlParams);
      })
    )
    .then(results => {
      console.log(`Added ${results.length} answers to the database`);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error making database query`, error);
      res.sendStatus(500);
    })
  })
  
  
  module.exports = router;