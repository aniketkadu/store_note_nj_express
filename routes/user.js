const express = require('express');
const usersController =  require('../controller/user-controller')
const router =  express.Router();
router.route('/').get(usersController.getAllUsers)
router.route('/').post(usersController.CreateUser)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns a list of users
 */
module.exports = router;