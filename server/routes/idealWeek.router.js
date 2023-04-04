const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `SELECT "ideal_week".*, "category"."name" AS "category_name"
                   FROM "ideal_week"
                   JOIN "category" ON "ideal_week"."category_id" = "category"."id"
                   WHERE "ideal_week"."user_id" = $1`;
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
  

  module.exports = router;