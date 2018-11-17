const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/signup', (req, res) => {
  let user = req.body;

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodeappuser',
    password : 'password',
    database : 'nodeapp'
  });

  const query = `INSERT INTO Users (name, username, email, password) VALUES("${user.name}", "${user.username}", "${user.email}", "${md5(user.password)}");`;

  connection.connect()
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
  })

  connection.end();
});

module.exports = router;