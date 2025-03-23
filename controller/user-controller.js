const {executeQuery,handleError} = require('../services/db.service')
const { sendResponse } = require('../services/responseUtils');
const bcrypt = require('bcrypt');
const messages = require('../shared/constant'); 
exports.getAllUsers =  async (req, res) => {
    const sql = "SELECT * FROM users";
  
    try {
      const results = await executeQuery(sql);
      //res.status(200).json(results);
      if (results.length === 0) {
        // Returning a dynamic message when no user details are found
        return sendResponse(res, messages.SUCCESS_CODE, messages.SUCCESS_STATUS, messages.USER_NOT_FOUND_MESSAGE, []);
      }
  // Returning a success message with user details
   sendResponse(res, messages.SUCCESS_CODE, messages.SUCCESS_STATUS, messages.USER_FETCHED_MESSAGE, results); 
    } catch (error) {
      return sendResponse(res, messages.ERROR_CODE, messages.ERROR_STATUS, messages.ERROR_FETCHING_MESSAGE, err.message);
     // handleError(res, error, "Failed to fetch users");
    }
  }

  exports.CreateUser = async (req, res) => {
    const { username, email, password, first_name, last_name, date_of_birth, profile_picture, status } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for bcrypt
      // SQL query to insert a new user
      const insertQuery = `
        INSERT INTO users (
          username, 
          email, 
          password_hash, 
          first_name, 
          last_name, 
          date_of_birth, 
          profile_picture, 
          last_login, 
          status
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?);
      `;
  
      // Values to insert into the query
      const values = [
        username,
        email,
        hashedPassword,
        first_name,
        last_name,
        date_of_birth,
        profile_picture || null, // If no profile picture is provided, set as null
        status || 'active' // Default to 'active' if not provided
      ];
    
      try {
        const result = await executeQuery(insertQuery, values);
       return sendResponse(res, messages.SUCCESS_CODE, messages.SUCCESS_STATUS, messages.USER_CREATED_MESSAGE, [{userId: result.insertId}]); 
      } catch (error) {
        handleError(res, error, messages.ERROR_CREATING_USER);
      }
    }


