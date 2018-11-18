const express = require('express');
const router = express.Router();
var fs = require('fs');
var createConnection = require('../database/connection').createConnection;
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var userRepository = require('../repositories/user');
const RSA_PRIVATE_KEY = fs.readFileSync('./api/keys/key.pem');

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

router.post('/login', (req, res) => {
  const username = req.body.username,
        password = req.body.password;

  userRepository.validateUsernameAndPassword(username, password)
    .then((userId) => {
      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: userId.toString()
      });

      res.cookie("SESSIONID", jwtBearerToken, { httpOnly: true, secure: true });
      res.status(200).json({
        idToken: jwtBearerToken, 
        expiresIn: 120
      });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(401);
    });
});

module.exports = router;