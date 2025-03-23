// Standard response handler for API responses
const sendResponse = (res, statusCode, status, message, data = []) => {
    res.status(statusCode).json({
      status,
      message,
      data
    });
  };
  
  module.exports = { sendResponse };