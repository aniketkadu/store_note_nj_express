const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');
const url = require('url');

dotenv.config();

let config = {};

if (process.env.DB_URL) {
  const dbUrl = new url.URL(process.env.DB_URL);

  config = {
    host: dbUrl.hostname,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''),
    port: dbUrl.port,
    connectionLimit: 10
  };
}

const pool = mysql2.createPool(config);

module.exports = pool;
