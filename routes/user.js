const express = require('express');
const usersController =  require('../controller/user-controller')
const router =  express.Router();
router.route('/').get(usersController.getAllUsers)
router.route('/').post(usersController.CreateUser)

module.exports = router;