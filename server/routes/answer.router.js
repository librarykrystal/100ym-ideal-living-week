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
  
  router.post('/', async (req, res) => {
    console.log(req.body);
    const entries = req.body;
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');
      let queryText = `INSERT INTO "answer" ("user_id", "question_id", "response") 
                       VALUES ($1, $2, $3) RETURNING "id";`;
      for(let entry of entries) {
        const values = [req.user_id, entry.question_id, entry.response];
        await client.query(queryText, values);
      }
  
      await client.query('COMMIT');
      console.log(`Added answers to the database`);
      res.sendStatus(201);
    } catch (e) {
      console.log('ROLLBACK', e);
      await client.query('ROLLBACK');
      res.sendStatus(500);
    } finally {
      client.release();
    }
  });
  
  
  
  module.exports = router;