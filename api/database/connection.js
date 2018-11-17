var mysql = require('mysql');

module.exports = {
  createConnection() {
    return mysql.createConnection({
      host     : 'localhost',
      user     : 'nodeappuser',
      password : 'password',
      database : 'nodeapp'
    });
  }
}