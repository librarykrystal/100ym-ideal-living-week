const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

    const queryText = `SELECT * FROM "question";`;
    pool.query(queryText ).then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((err) => {
      console.log('err w get request', err);
      res.sendStatus(500);
    });
  });


  router.post('/', (req, res) => {
    const category_id = req.body.category_id;
    const question_text = req.body.question_text;
    const sqlText = `INSERT INTO "question" ("category_id", "question_text")
                     VALUES ($1, $2)
                     RETURNING "id";`;
    const sqlParams = [category_id, question_text];
    pool.query(sqlText, sqlParams)
      .then(result => {
        console.log(`Added question to the database`, result.rows[0].id);
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500);
      })
  });

  module.exports = router;