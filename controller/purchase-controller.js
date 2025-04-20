const { executeQuery, handleError } = require("../services/db.service");
const { sendResponse } = require("../services/responseUtils");
const messages = require("../shared/constant");

exports.getItemsByCustomer = async (req, res) => {
  const sqlQuery =
    `SELECT * FROM purchases where customer_id = ? AND payment_status = ?`;
  try {
    const { customer_id, payment_status } = req.body;
    const results = await executeQuery(sqlQuery, [customer_id, payment_status]);
    sendResponse(
      res,
      messages.SUCCESS_CODE,
      messages.SUCCESS_STATUS,
      messages.DATA_FETCHED_MESSAGE,
      results
    );
  } catch (error) {
    return sendResponse(
      res,
      messages.ERROR_CODE,
      messages.ERROR_STATUS,
      messages.ERROR_FETCHING_MESSAGE,
      error.message
    );
  }
};
