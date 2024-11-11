const mysql = require('mysql');
// require('dotenv').config()

const connection = mysql.createPool({
  connectionLimit : 10,
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  //multipleStatements: true
});

module.exports = connection;
