const { executeQuery, handleError } = require("../services/db.service");
const { sendResponse } = require("../services/responseUtils");
const messages = require("../shared/constant");

exports.getItemsByCustomer = async (req, res) => {
  const sqlQuery = `SELECT * FROM purchases where customer_id = ? AND payment_status = ?`;
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

exports.createPurchase = async (req, res) => {

  try {
    const { customer_id, items } = req.body;

    // Check if the items array exists and has at least one item
    if (!items || items.length === 0) {
      return sendResponse(
        res,
        messages.BAD_REQUEST_CODE,
        messages.BAD_REQUEST_STATUS,
        "Items are required.",
        []
      );
    }

      // Convert to [[1, "Pepsi", 23.54, 2], [...], ...]
      const values = items.map(item => [
        customer_id,
        item.item_name,
        item.price,
        item.quantity
      ]);
  
   // Create a string of placeholders like: (?, ?, ?, ?), (?, ?, ?, ?)
   const placeholders = values.map(() => '(?, ?, ?, ?)').join(', ');

   // Flatten values into a single array
   const flattenedValues = values.flat();

   const sqlQuery = `
     INSERT INTO purchases (customer_id, item_name, price, quantity)
     VALUES ${placeholders}
   `;

    // Use a single query for bulk insert
    await executeQuery(sqlQuery, flattenedValues);
    return sendResponse(
      res,
      messages.SUCCESS_CODE,
      messages.SUCCESS_STATUS,
      messages.COMMON_INSERT_MESSAGE,
      [{}]
    );
  } catch (error) {
    handleError(res, error, messages.COMMON_ERROR_MESSAGE);
  }
};
