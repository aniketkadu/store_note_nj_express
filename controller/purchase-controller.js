const { executeQuery, handleError } = require("../services/db.service");
const { sendResponse } = require("../services/responseUtils");
const messages = require("../shared/constant");

exports.getItemsByCustomer = async (req, res) => {
  let purchasesQuery = 'SELECT * FROM purchases WHERE customer_id = ?';
let totalQuery = 'SELECT SUM(price * quantity) AS total_amount FROM purchases WHERE customer_id = ?';
  
try {
    const { customer_id, payment_status } = req.body;
    const queryParams = [customer_id];
    // Check if user wants all payment statuses
    if (payment_status !== 'all') {
      purchasesQuery += ' AND payment_status = ?';
      totalQuery += ' AND payment_status = ?';
      queryParams.push(payment_status);
    }
    
    const purchases = await executeQuery(purchasesQuery, queryParams);
    const totalResult = await executeQuery(totalQuery, queryParams);
    const totalAmount = totalResult[0]?.total_amount || 0;
    sendResponse(
      res,
      messages.SUCCESS_CODE,
      messages.SUCCESS_STATUS,
      messages.COMMON_DATA_FETCH_MESSAGE,
      {
        purchases,
        total_amount: totalAmount
      }
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


exports.markAsPaymentCompleted = async (req,res) => {
  const { purchase_ids, customer_id, all_pending } = req.body;

  try {
    let result;

    if (all_pending && customer_id) {
      // ✅ Complete all pending purchases for a customer
      const sql = `UPDATE purchases SET payment_status = 'completed' WHERE customer_id = ? AND payment_status = 'pending'`;
      result = await executeQuery(sql, [customer_id]);
    } else if (Array.isArray(purchase_ids) && purchase_ids.length > 0) {
      // ✅ Complete specific purchases
      const placeholders = purchase_ids.map(() => '?').join(',');
      const sql = `UPDATE purchases SET payment_status = 'completed' WHERE purchase_id IN (${placeholders}) AND payment_status = 'pending'`;
      result = await executeQuery(sql, purchase_ids);
    } else {
      return sendResponse(
        res,
        400,
        false,
        'Invalid request. Provide purchase_ids or customer_id with all_pending.',
        null
      );
    }

    sendResponse(
      res,
      200,
      true,
      'Purchase(s) marked as completed successfully.',
      { affectedRows: result.affectedRows }
    );
  } catch (error) {
    console.error('Error updating purchases:', error);
    sendResponse(res, 500, false, 'Internal Server Error', null);
  }
};