// database.js
const mysql2 = require('mysql2');

// Set up the connection pool
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ritZ#Mobile',
  database: 'store_note',
  connectionLimit: 10
});

// Export the pool for use in other files
module.exports = pool;
