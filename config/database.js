const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'db4free.net',
  user     : 'matchauser01',
  password : 'mystic3mystic3',
  database : 'matcha01',
  port: '3306'
});

module.exports = pool;
