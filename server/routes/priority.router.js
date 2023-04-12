
/// SITILL IN WORKS

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.get('/', (req, res) => {

//   const queryText = 'SELECT * FROM "priority" ;';
//     pool.query(queryText ).then((result) => {
//       console.log(result.rows);
//       res.send(result.rows);
//     }).catch((err) => {
//       console.log('err w get request', err);
//       res.sendStatus(500);
//     });
//   });

//   router.post('/', (req, res) => {
//     const user_id = req.body.user_id;
//     const category_id = req.body.category_id;
//     const rank = req.body.rank;
//     const sqlText = `INSERT INTO "priority"  ("category_id", "rank")
//                      VALUES ($1, $2)
//                      RETURNING "id";`;
//     const sqlParams = [category_id, rank];
//     pool.query(sqlText, sqlParams)
//       .then(result => {
//         console.log(`Added priority to the database`, result.rows[0].id);
//         res.sendStatus(201);
//       })
//       .catch(error => {
//         console.log(`Error making database query ${sqlText}`, error);
//         res.sendStatus(500);
//       })
//   });


  module.exports = router;