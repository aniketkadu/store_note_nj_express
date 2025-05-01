const express = require('express');
const purchaseController =  require('../controller/purchase-controller')
const router =  express.Router();
// this will give list of items were purchases by customer by cust id ("payment_status": "pending")
router.route('/').post(purchaseController.getItemsByCustomer);
router.route('/create-purchases').post(purchaseController.createPurchase);

module.exports = router;