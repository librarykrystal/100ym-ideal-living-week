router.get('/', (req, res) => {

    const queryText = `SELECT * FROM "question" WHERE "category_id"=$1;`;
    pool.query(queryText ).then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((err) => {
      console.log('err w get request', err);
      res.sendStatus(500);
    });
  });