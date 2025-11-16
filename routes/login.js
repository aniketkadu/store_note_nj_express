const express = require('express');
const loginController =  require('../controller/login-controller')
const router =  express.Router();
router.route('/').post(loginController.login);

module.exports = router;