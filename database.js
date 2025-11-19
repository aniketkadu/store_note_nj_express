// database.js
const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv')

dotenv.config();

//Set up the connection pool
// const pool = mysql2.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'ritZ#Mobile',
//   database: 'store_note',
//   connectionLimit: 10
// });
// Set up the connection pool

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10
});

// Export the pool for use in other files
module.exports = pool;
