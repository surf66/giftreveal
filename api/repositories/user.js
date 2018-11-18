var database = require('../database/connection');
var md5 = require('md5');

module.exports = {

  validateUsernameAndPassword(username, password) {
    return new Promise((resolve, reject) => {
      let connection = database.createConnection();

      const query = `SELECT * FROM Users WHERE username = "${username}";`;

      connection.connect();
      connection.query(query, function (err, rows, fields) {
        if (err) throw err;
        let user = rows[0];
        user.password === md5(password) ? resolve(user.id) : reject('password incorrect');
      });

      connection.end();
    });
  }
  
}