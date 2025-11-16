const express = require('express');
const customersController =  require('../controller/customer-controller')
const router =  express.Router();
router.route('/').get(customersController.getAllCustomers)
router.route('/').post(customersController.CreateCustomer)

module.exports = router;