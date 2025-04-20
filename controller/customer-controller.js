const {executeQuery,handleError} =require('../services/db.service')
const { sendResponse } = require('../services/responseUtils');
const messages = require('../shared/constant'); 

exports.getAllCustomers = async (req,res) => {
    const sql = "Select * from customers where status = 'active'"
    try {
        const results = await executeQuery(sql)
        if (results.length === 0) {
            // Returning a dynamic message when no user details are found
            return sendResponse(res, messages.SUCCESS_CODE, messages.SUCCESS_STATUS, messages.USER_NOT_FOUND_MESSAGE, []);
          }

     sendResponse(res, messages.SUCCESS_CODE, messages.SUCCESS_STATUS, messages.USER_FETCHED_MESSAGE, results); 
          
    } catch (error) {
        return sendResponse(res, messages.ERROR_CODE, messages.ERROR_STATUS, messages.ERROR_FETCHING_MESSAGE, error.message);
        
    } 
}


    exports.CreateCustomer = async (req, res) => {
        const { cust_name, email, phone, status } = req.body;
       
           const checkUserQuery = `
           SELECT * FROM customers 
           WHERE phone = ? AND status='active';
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
