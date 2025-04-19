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
        return sendResponse(res, messages.ERROR_CODE, messages.ERROR_STATUS, messages.USER_NOT_FOUND_MESSAGE, []);
      }
  // Returning a success message with user details
   sendResponse(res, messages.SUCCESS_CODE, messages.SUCCESS_STATUS, messages.USER_FETCHED_MESSAGE, results); 
    } catch (error) {
      return sendResponse(res, messages.ERROR_CODE, messages.ERROR_STATUS, messages.ERROR_FETCHING_MESSAGE, err.message);
     // handleError(res, error, "Failed to fetch users");
    }
  }

  exports.CreateUser = async (req, res) => {
    const { cust_name, email, phone, status } = req.body;

    const checkUserQuery = `
    SELECT * FROM customers 
    WHERE phone = ? AND staus='active';
  `;
    const result = await executeQuery(checkUserQuery, [phone]);
      // If username or email already exists
      if (result.length > 0) {
       return sendResponse(res, messages.BAD_REQUEST, messages.ERROR_STATUS, messages.ERROR_CUSTOMER_EXIST, {}); 
      }
      // SQL query to insert a new user
      const insertQuery = `INSERT INTO customers (name, email, phone, status) VALUES (?, ?, ?, ?);`;
  
      // Values to insert into the query
      const values = [
        cust_name, email, phone, status
      ];
    
      try {
        const result = await executeQuery(insertQuery, values);
       return sendResponse(res, messages.SUCCESS_CODE, messages.SUCCESS_STATUS, messages.CUSTOMER_CREATED_MESSAGE, [{customerId: result.insertId}]); 
      } catch (error) {
        handleError(res, error, messages.ERROR_CREATING_USER);
      }
    }


