const pool = require("../database");

const executeQuery = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (err) {
    throw err;
  }
};

const handleError = (res, error, customMessage) => {
  console.error(error);
  res
    .status(500)
    .json({ error: customMessage || "Database error", details: error });
};

module.exports = { executeQuery, handleError };
