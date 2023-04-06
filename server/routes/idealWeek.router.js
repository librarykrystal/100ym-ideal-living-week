const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const query = `SELECT "ideal_week".*, "category"."name" AS "category_name"
                   FROM "ideal_week"
                   JOIN "category" ON "ideal_week"."category_id" = "category"."id"
                   WHERE "ideal_week"."user_id" = $1`;
  const sqlParams = [req.user.id];

  pool
    .query(query, sqlParams)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${query}`, error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const userId = req.user.id;
  const entry = req.body;
  const sqlText = `INSERT INTO "ideal_week" ("user_id", "day", "start_time", "end_time", "category_id")
                     VALUES ($1, $2, $3, $4, $5)
                     RETURNING "id";`;
  const sqlParams = [
    userId,
    entry.day,
    entry.start_time,
    entry.end_time,
    entry.category_id,
  ];
  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      console.log(`Added entry to the database`, result.rows[0].id);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
