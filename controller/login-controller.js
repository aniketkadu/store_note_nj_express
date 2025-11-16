const {executeQuery,handleError} = require('../services/db.service')
const { sendResponse } = require('../services/responseUtils');
const bcrypt = require('bcrypt');
const messages = require('../shared/constant'); 

exports.login =  async (req, res) => {
    const { username, password, } = req.body;
    const userQuery =  `SELECT * FROM users WHERE username = ? AND status= 'active'`
    // console.log('>>>',userQuery)
    try {
        const result = await executeQuery(userQuery,[username])
        if (!result || result.length === 0 ) {
            return sendResponse(res, messages.NOT_FOUND, messages.ERROR_STATUS, messages.USER_NOT_FOUND_MESSAGE, messages.ERROR_STATUS, messages.USER_NOT_FOUND_MESSAGE);
          }
    
          const isMatch  = await bcrypt.compare(password, result[0].password_hash); // 10 is the salt rounds for bcrypt
          if(isMatch) {
            // Returning a success message with user details
              sendResponse(res, messages.SUCCESS_CODE, messages.SUCCESS_STATUS, messages.LOGIN_SUCCESSFULL, result.email); 
          } else {
            sendResponse(res, messages.NOT_FOUND, messages.ERROR_STATUS, messages.INVALID_CRED, {}); 
          }
     ;
   
  
    } catch (error) {
        console.log('er>>>>', error);
        
      return sendResponse(res, messages.ERROR_CODE, messages.ERROR_STATUS, messages.ERROR_FETCHING_MESSAGE, err);
     // handleError(res, error, "Failed to fetch users");
    }
  }