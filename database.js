// database.js
const mysql2 = require('mysql2');

// Set up the connection pool
// const pool = mysql2.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'ritZ#Mobile',
//   database: 'store_note',
//   connectionLimit: 10
// });
// Set up the connection pool
const pool = mysql2.createPool({
   host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// Export the pool for use in other files
module.exports = pool;
