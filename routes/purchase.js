const express = require('express');
const purchaseController =  require('../controller/purchase-controller')
const router =  express.Router();
router.route('/').post(purchaseController.getItemsByCustomer)

module.exports = router;