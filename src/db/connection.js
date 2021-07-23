const mysql = require("mysql2");
require("dotenv").config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

mysql.

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Successfully connected tp the database");
     }

});
connection.

module.exports = connection;
