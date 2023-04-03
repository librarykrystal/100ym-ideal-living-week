router.get('/', (req, res) => {

    const queryText = 'SELECT * FROM "category" ;';
    pool.query(queryText ).then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((err) => {
      console.log('err w get request', err);
      res.sendStatus(500);
    });
  });