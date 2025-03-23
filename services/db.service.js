const pool = require("../database");


const executeQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.execute(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };


  // Reusable function for handling errors
const handleError = (res, error, customMessage) => {
  console.error(error);
  res
    .status(500)
    .json({ error: customMessage || "Database error", details: error });
};

module.exports = {executeQuery,handleError}