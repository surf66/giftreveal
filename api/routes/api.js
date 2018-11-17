const express = require('express');
const router = express.Router();
var createConnection = require('../database/connection').createConnection;
var md5 = require('md5');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/signup', (req, res) => {
  var connection = createConnection();
  let user = req.body;

  const query = `INSERT INTO Users (name, username, email, password) VALUES("${user.name}", "${user.username}", "${user.email}", "${md5(user.password)}");`;

  connection.connect();
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
  })

  connection.end();
});

module.exports = router;