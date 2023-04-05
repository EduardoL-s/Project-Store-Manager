const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: 'root',
  password: 'password',
  database: 'StoreManager',
  port: 3306,
  host: 'db',
});

module.exports = connection;