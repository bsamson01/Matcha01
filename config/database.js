const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'matchauser',
  password : 'password',
  database : 'matcha',
  port: '3306'
});

module.exports = pool;
